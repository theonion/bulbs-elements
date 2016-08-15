import './bulbs-reading-list';
import ReadingItemList from './lib/reading-item-list';

describe('<bulbs-reading-list>', () => {
  let subject;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    fixture.load('bulbs-reading-list.html');
    subject = fixture.el.firstChild;
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders an <bulbs-reading-list>', () => {
    expect(subject.tagName.toLowerCase()).to.equal('bulbs-reading-list');
  });

  it('has a reading list menu', () => {
    expect(subject.readingListMenu).to.be.an.instanceof(ReadingItemList);
  });

  it('has an article list', () => {
    expect(subject.articleList).to.be.an.instanceof(ReadingItemList);
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
      let itemElement = subject.readingListMenu.itemAtIndex(0).element;
      eventStub.target = itemElement.getElementsByTagName('a')[0];
      subject.handleMenuItemClick(eventStub);
      expect(eventStub.preventDefault).to.have.been.called;
    });

    it('sets the clicked item as current', () => {
      let item = subject.readingListMenu.itemAtIndex(1);
      let itemElement = item.element;
      eventStub.target = itemElement.getElementsByTagName('a')[0];
      subject.handleMenuItemClick(eventStub);
      expect(item.isCurrent()).to.equal(true);
    });
  });

  describe('elementIsInsideMenu', () => {
    it('throws an error when no element is given', () => {
      expect(() => {
        subject.elementIsInsideMenu();
      }).to.throw('BulbsReadingList.elementIsInsideMenu(element): element is undefined');
    });

    it('returns false if the given element is not inside the menu', () => {
      let element = document.createElement('a');
      document.body.appendChild(element);
      expect(subject.elementIsInsideMenu(element)).to.equal(false);
    });

    it('returns true when the given element is inside the menu', () => {
      let element = subject.readingListMenu.itemAtIndex(0).element;
      expect(subject.elementIsInsideMenu(element)).to.equal(true);
    });
  });

  describe('getClickedMenuItem', () => {
    it('returns the list item that was clicked', () => {
      let item = subject.readingListMenu.itemAtIndex(1);
      let itemElement = item.element;
      let el = itemElement.getElementsByTagName('a')[0];

      expect(subject.getClickedMenuItem(el)).to.equal(item);
    });
  });

  describe('isScrollingDown', () => {
    it('returns true when the given position is greater than the last known position', () => {
      expect(subject.isScrollingDown(100)).to.equal(true);
    });

    it('returns false when the given position is less than the last known position', () => {
      subject.lastKnownScrollPosition = 200;
      expect(subject.isScrollingDown(100)).to.equal(false);
    });
  });

  describe('isScrollingUp', () => {
    it('returns false when the given position is greater than the last known position', () => {
      expect(subject.isScrollingUp(100)).to.equal(false);
    });

    it('returns true when the given position is less than the last known position', () => {
      subject.lastKnownScrollPosition = 200;
      expect(subject.isScrollingUp(100)).to.equal(true);
    });
  });

  describe('shouldLoadNextArticle', () => {
    let nextArticle;
    beforeEach(() => {
      nextArticle = subject.articleList.itemAtIndex(1);
    });

    it('returns true when the next article is within the viewport threshold', () => {
      sandbox.stub(nextArticle, 'isWithinViewThreshold').returns(true);
      expect(subject.shouldLoadNextArticle(nextArticle)).to.equal(true);
    });

    it('returns false when there is no next item', () => {
      sandbox.stub(nextArticle, 'isWithinViewThreshold').returns(true);
      expect(subject.shouldLoadNextArticle()).to.equal(false);
    });

    it('returns false when the next item is not within the view threshold', () => {
      sandbox.stub(nextArticle, 'isWithinViewThreshold').returns(false);
      expect(subject.shouldLoadNextArticle(nextArticle)).to.equal(false);
    });
  });

  describe('loadNextArticle', () => {
    context('when there is a next item', () => {
      let nextArticle;
      beforeEach(() => {
        nextArticle = subject.articleList.itemAtIndex(1);
        sandbox.stub(nextArticle, 'loadContent');
        sandbox.stub(subject.articleList, 'nextItem').returns(nextArticle);
      });

      it('does nothing if the article is not within the view threshold', () => {
        sandbox.stub(nextArticle, 'isWithinViewThreshold').returns(false);
        subject.loadNextArticle();
        expect(nextArticle.loadContent).to.not.have.been.called;
      });

      it('loads the article if within view threshold', () => {
        sandbox.stub(nextArticle, 'isWithinViewThreshold').returns(true);
        subject.loadNextArticle();
        expect(nextArticle.loadContent).to.have.been.called;
      });
    });
  });

  describe('handleDocumentScrolled', () => {
  });
});
