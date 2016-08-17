import '../bulbs-reading-list';
import ReadingListEventManager from './reading-list-event-manager';
import ReadingItemList from './reading-item-list';

describe('ReadingListEventManager', () => {
  let subject;
  let sandbox;
  let element;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    fixture.load('bulbs-reading-list.html');
    element = fixture.el.firstChild;
    subject = new ReadingListEventManager(element);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('has a reading item list', () => {
    expect(subject.readingItemList).to.be.an.instanceof(ReadingItemList);
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
      let itemElement = subject.readingItemList.itemAtIndex(0).menuElement;
      eventStub.target = itemElement.getElementsByTagName('a')[0];
      subject.handleMenuItemClick(eventStub);
      expect(eventStub.preventDefault).to.have.been.called;
    });

    it('sets the clicked item as current', () => {
      let item = subject.readingItemList.itemAtIndex(1);
      let itemElement = item.menuElement;
      eventStub.target = itemElement.getElementsByTagName('a')[0];
      subject.handleMenuItemClick(eventStub);
      expect(item.isCurrent).to.equal(true);
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
      element = subject.readingItemList.itemAtIndex(0).menuElement;
      expect(subject.elementIsInsideMenu(element)).to.equal(true);
    });
  });

  describe('getClickedMenuItem', () => {
    it('returns the list item that was clicked', () => {
      let item = subject.readingItemList.itemAtIndex(1);
      let itemElement = item.menuElement;
      let el = itemElement.getElementsByTagName('a')[0];

      expect(subject.getClickedMenuItem(el)).to.equal(item);
    });
  });

  describe('handleDocumentScrolled', () => {
    beforeEach(() => {
      sandbox.spy(window, 'requestAnimationFrame');
      sandbox.stub(subject.readingItemList, 'loadNextArticle');
    });

    it('calls processScrollPosition on next animation frame', () => {
      subject.handleDocumentScrolled();
      expect(window.requestAnimationFrame).to.have.been.called;
      expect(window.requestAnimationFrame.args[0][0].name).to.match(/processScrollPosition/);
    });

    context('when fetching the next article', () => {
      it('does nothing', () => {
        subject.readingItemList.isFetchingNextArticle = true;
        subject.handleDocumentScrolled();
        expect(window.requestAnimationFrame).to.not.have.been.called;
      });
    });
  });
});
