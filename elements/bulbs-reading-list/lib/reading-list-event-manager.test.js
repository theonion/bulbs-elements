import '../bulbs-reading-list';
import ReadingListEventManager from './reading-list-event-manager';
import ReadingList from './reading-list';

describe('ReadingListEventManager', () => {
  let subject;
  let sandbox;
  let element;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(window, 'addEventListener');
    fixture.load('bulbs-reading-list.html');
    element = fixture.el.firstChild;
    subject = new ReadingListEventManager(element);
  });

  afterEach(() => {
    sandbox.restore();
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
        sandbox.stub(item, 'isLoaded').returns(true);
        eventStub.target = item.menuElement;
        subject.handleMenuItemClick(eventStub);
        expect(subject.readingList.navigateToItem).to.have.been.called;
      });
    });

    context('when the article is not loaded', () => {
      it('loads the next article if the article is next', () => {
        let item = subject.readingList.itemAtIndex(1);
        sandbox.stub(item, 'isLoaded').returns(false);
        sandbox.stub(subject.readingList, 'loadNextItem');
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
  });

  describe('handleDocumentScrolled', () => {
    beforeEach(() => {
      sandbox.spy(window, 'requestAnimationFrame');
      sandbox.stub(subject.readingList, 'loadNextItem');
    });

    it('calls processScrollPosition on next animation frame', () => {
      subject.handleDocumentScrolled();
      expect(window.requestAnimationFrame).to.have.been.called;
      expect(window.requestAnimationFrame.args[0][0].name).to.match(/processScrollPosition/);
    });

    context('when fetching the next article', () => {
      it('does nothing', () => {
        subject.readingList.isFetchingNextItem = true;
        subject.handleDocumentScrolled();
        expect(window.requestAnimationFrame).to.not.have.been.called;
      });
    });
  });
});
