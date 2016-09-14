import '../bulbs-reading-list';
import ReadingListEventManager from './reading-list-event-manager';
import ReadingList from './reading-list';
import buildReadingListFixture from './reading-list-test-helper';
import {
  appendFixtureContainer,
  removeFixtures,
} from 'bulbs-elements/test/fixtures';

describe('ReadingListEventManager', () => {
  let subject;
  let sandbox;
  let element;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(window, 'addEventListener');
    let fixtureContainer = appendFixtureContainer();
    let readingListElement = buildReadingListFixture();
    fixtureContainer.appendChild(readingListElement);
    element = readingListElement;
    subject = new ReadingListEventManager(element);
  });

  afterEach(() => {
    sandbox.restore();
    removeFixtures();
    window.location.hash = '#';
  });

  it('has a reading item list', () => {
    expect(subject.readingList).to.be.an.instanceof(ReadingList);
  });

  it('saves a reference to the element', () => {
    expect(subject.element).to.equal(element);
  });

  it('has an scrollCalculationIsIdle flag', () => {
    expect(subject.scrollCalculationIsIdle).to.equal(true);
  });

  it('has a lastKnownScrollPosition', () => {
    expect(subject.lastKnownScrollPosition).to.equal(0);
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
      subject.handleMenuItemClick(eventStub);
      expect(eventStub.preventDefault).to.not.have.been.called;
    });

    it('prevents the default behavior if the target is inside a bulbs-reading-list-item', () => {
      let itemElement = subject.readingList.itemAtIndex(0).menuElement;
      eventStub.target = itemElement.getElementsByTagName('a')[0];
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
