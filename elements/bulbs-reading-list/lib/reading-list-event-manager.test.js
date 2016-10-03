import '../bulbs-reading-list';
import '../../bulbs-flyover-menu/bulbs-flyover-menu';
import ReadingListEventManager from './reading-list-event-manager';
import ReadingList from './reading-list';
import buildReadingListFixture from './reading-list-test-helper';
import {
  appendFixtureContainer,
  removeFixtures,
  createElement,
} from 'bulbs-elements/test/fixtures';

describe('ReadingListEventManager', () => {
  let subject;
  let sandbox;
  let element;
  let fixtureContainer;
  let stickyContainer;
  let pinnedContainer;
  let pinnedTether;
  let menuOnButton;

  beforeEach((done) => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(window, 'addEventListener');

    stickyContainer = createElement('div', { 'class': 'sticky-container' });
    pinnedContainer = createElement('div', { 'class': 'pinned-container' });
    pinnedTether = createElement('div', { 'class': 'article-detail-content' });
    menuOnButton = createElement('div', { 'class': 'reading-list-menu-toggle-on' });
    element = buildReadingListFixture({
      'sticky-nav-tether': '.sticky-container',
      'pinned-tether': '.article-detail-content',
      'pinned-container': '.pinned-container',
      'pinned-container-min-width': 768,
    });
    fixtureContainer = appendFixtureContainer();
    fixtureContainer.appendChild(stickyContainer);
    fixtureContainer.appendChild(pinnedTether);
    fixtureContainer.appendChild(pinnedContainer);
    fixtureContainer.appendChild(menuOnButton);
    fixtureContainer.appendChild(element);

    subject = new ReadingListEventManager(element, {
      stickyNavTetherSelector: '.sticky-container',
      pinnedContainerSelector: '.pinned-container',
      pinnedTetherSelector: '.article-detail-content',
      pinnedContainerMinWidth: 768,
    });

    setTimeout(done, 1);
  });

  afterEach(() => {
    sandbox.restore();
    removeFixtures();
    window.location.hash = '#';
  });

  it('requires an element', function () {
    expect(() => {
      new ReadingListEventManager(); // eslint-disable-line no-new
    }).to.throw('new ReadingListEventManager(element, options): element is undefined');
  });

  it('has a reading item list', () => {
    expect(subject.readingList).to.be.an.instanceof(ReadingList);
  });

  it('saves a reference to the element', () => {
    expect(subject.element).to.equal(element);
  });

  it('has a scrollCalculationIsIdle flag', () => {
    expect(subject.scrollCalculationIsIdle).to.equal(true);
  });

  it('has a lastKnownScrollPosition', () => {
    expect(subject.lastKnownScrollPosition).to.equal(0);
  });

  it('requires the tether element to exist', function () {
    expect(() => {
      new ReadingListEventManager(element, { // eslint-disable-line no-new
        stickyNavTetherSelector: '.missing-tether',
      });
    }).to.throw('ReadingListEventManager(element, stickyNavTetherSelector): nav tether element with selector ".missing-tether" is not in the DOM');
  });

  describe('handleMenuItemClick', () => {
    let eventStub;
    beforeEach(() => {
      eventStub = {
        target: document.createElement('a'),
        preventDefault: sandbox.spy(),
      };
    });

    it('does not prevent default behavior if the clicked element is not in the menu', () => {
      sandbox.stub(subject, 'elementIsInsideMenu').returns(false);
      subject.handleMenuItemClick(eventStub);
      expect(eventStub.preventDefault).to.not.have.been.called;
    });

    it('prevents the default behavior if the target is inside a bulbs-reading-list-item', () => {
      let itemElement = subject.readingList.itemAtIndex(0).menuElement;
      eventStub.target = itemElement.getElementsByTagName('a')[0];
      sandbox.stub(subject.readingList, 'updateItemProgress');
      subject.handleMenuItemClick(eventStub);
      expect(eventStub.preventDefault).to.have.been.called;
    });

    context('when the article is already loaded', () => {
      it('navigates to the item', () => {
        let item = subject.readingList.itemAtIndex(1);
        sandbox.stub(subject.readingList, 'navigateToItem');
        item.isLoaded = true;
        eventStub.target = item.menuElement;
        subject.handleMenuItemClick(eventStub);
        expect(subject.readingList.navigateToItem).to.have.been.called;
      });
    });

    context('when the article is not loaded', () => {
      it('loads the next article if the article is next', () => {
        let item = subject.readingList.itemAtIndex(1);
        item.isLoaded = false;
        sandbox.stub(subject.readingList, 'loadNextItem').returns(Promise.resolve(item));
        sandbox.stub(subject.readingList, 'isNextItem').returns(true);
        eventStub.target = item.menuElement;
        subject.handleMenuItemClick(eventStub);
        expect(subject.readingList.loadNextItem).to.have.been.called;
      });
    });

    context('when the article is more than one ahead in the list', () => {
      it('redirects to the item', () => {
        let item = subject.readingList.itemAtIndex(1);
        item.loaded = false;
        sandbox.stub(subject.readingList, 'redirectToItem');
        sandbox.stub(subject.readingList, 'isNextItem').returns(false);
        sandbox.stub(subject.readingList, 'isMoreThanOneAhead').returns(true);
        eventStub.target = item.menuElement;
        subject.handleMenuItemClick(eventStub);
        expect(subject.readingList.redirectToItem).to.have.been.called;
      });
    });
  });

  describe('elementIsInsideMenu', () => {
    it('throws an error when no element is given', () => {
      expect(() => {
        subject.elementIsInsideMenu();
      }).to.throw('BulbsReadingList.elementIsInsideMenu(element): element is undefined');
    });

    it('returns false if the given element is not inside the menu', () => {
      element = document.createElement('a');
      document.body.appendChild(element);
      expect(subject.elementIsInsideMenu(element)).to.equal(false);
    });

    it('returns true when the given element is inside the menu', () => {
      element = subject.readingList.itemAtIndex(0).menuElement;
      expect(subject.elementIsInsideMenu(element)).to.equal(true);
    });
  });

  describe('getClickedMenuItem', () => {
    it('returns the list item that was clicked', () => {
      let item = subject.readingList.itemAtIndex(1);
      let itemElement = item.menuElement;
      let el = itemElement.getElementsByTagName('a')[0];

      expect(subject.getClickedMenuItem(el)).to.equal(item);
    });

    it('returns the list item if the list item itself was clicked', () => {
      let item = subject.readingList.itemAtIndex(1);
      let itemElement = item.menuElement;

      expect(subject.getClickedMenuItem(itemElement)).to.equal(item);
    });
  });

  describe('processScrollPosition', () => {
    beforeEach(() => {
      sandbox.stub(subject.readingList, 'scrollDown');
      sandbox.stub(subject.readingList, 'scrollUp');
      sandbox.stub(subject.readingList, 'updateItemProgress');
    });

    it('scrolls the reading list down when scrolling down', () => {
      sandbox.stub(subject, 'isScrollingDown').returns(true);
      subject.processScrollPosition();
      expect(subject.readingList.scrollDown).to.have.been.called;
    });

    it('scrolls the reading list up when scrolling up', () => {
      sandbox.stub(subject, 'isScrollingUp').returns(true);
      subject.processScrollPosition();
      expect(subject.readingList.scrollUp).to.have.been.called;
    });

    it('sets the lastKnownScrollPosition', () => {
      let position = 9999999;
      subject.lastKnownScrollPosition = position;
      subject.processScrollPosition();
      expect(subject.lastKnownScrollPosition).to.not.equal(position);
    });
  });

  describe('isScrollingUp', () => {
    it('requires a lastOffset', () => {
      expect(() => {
        subject.isScrollingUp();
      }).to.throw('ReadingListEventManager.isScrollingUp(lastOffset, currentOffset): lastOffset is undefined');
    });

    it('requires a currentOffset', () => {
      expect(() => {
        subject.isScrollingUp(0);
      }).to.throw('ReadingListEventManager.isScrollingUp(lastOffset, currentOffset): currentOffset is undefined');
    });

    it('returns true if the lastOffset is greater than the currentOffset', () => {
      expect(subject.isScrollingUp(1, 0)).to.equal(true);
    });

    it('returns false if the lastOffset is less than the currentOffset', () => {
      expect(subject.isScrollingUp(0, 1)).to.equal(false);
    });
  });

  describe('isScrollingDown', () => {
    it('requires a lastOffset', () => {
      expect(() => {
        subject.isScrollingDown();
      }).to.throw('ReadingListEventManager.isScrollingDown(lastOffset, currentOffset): lastOffset is undefined');
    });

    it('requires a currentOffset', () => {
      expect(() => {
        subject.isScrollingDown(0);
      }).to.throw('ReadingListEventManager.isScrollingDown(lastOffset, currentOffset): currentOffset is undefined');
    });

    it('returns false if the lastOffset is greater than the currentOffset', () => {
      expect(subject.isScrollingDown(1, 0)).to.equal(false);
    });

    it('returns true if the lastOffset is less than the currentOffset', () => {
      expect(subject.isScrollingDown(0, 1)).to.equal(true);
    });
  });
});
