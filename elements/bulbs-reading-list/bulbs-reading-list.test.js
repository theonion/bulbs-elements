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

  it('has a reading item list', () => {
    expect(subject.readingItemList).to.be.an.instanceof(ReadingItemList);
  });

  it('has an scrollCalculationIsIdle flag', () => {
    expect(subject.scrollCalculationIsIdle).to.equal(true);
  });

  it('has an isFetchingNextArticle flag', () => {
    expect(subject.isFetchingNextArticle).to.equal(false);
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
      let element = subject.readingItemList.itemAtIndex(0).menuElement;
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

  describe('shouldLoadNextArticle', () => {
    let nextArticle;
    beforeEach(() => {
      nextArticle = subject.readingItemList.itemAtIndex(1);
    });

    it('returns false if the reading list as an article with a pending fetch', () => {
      sandbox.stub(subject.readingItemList, 'hasPendingFetch').returns(true);
      expect(subject.shouldLoadNextArticle(nextArticle)).to.equal(false);
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
        nextArticle = subject.readingItemList.itemAtIndex(1);
        sandbox.stub(nextArticle, 'loadContent').returns(Promise.resolve(nextArticle));
        sandbox.stub(subject.readingItemList, 'nextItem').returns(nextArticle);
      });

      it('sets the isFetchingNextArticle flag to true', () => {
        sandbox.stub(subject, 'handleLoadNextArticleComplete');
        subject.loadNextArticle();
        expect(subject.isFetchingNextArticle).to.equal(true);
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

    context('when the content should not be loaded', () => {
      it('sets the isFetchingNextArticle flag to false', () => {
        sandbox.stub(subject, 'shouldLoadNextArticle').returns(false);
        subject.loadNextArticle();
        expect(subject.isFetchingNextArticle).to.equal(false);
      });
    });
  });

  describe('handleLoadNextArticleComplete', () => {
    let article;
    beforeEach(() => {
      article = subject.readingItemList.itemAtIndex(2);
    });

    it('sets the current readingItemList item by id', () => {
      subject.handleLoadNextArticleComplete(article);
      expect(subject.readingItemList.currentItem).to.equal(article);
    });

    it('sets the isFetchingNextArticle flag to false', () => {
      subject.isFetchingNextArticle = true;
      subject.handleLoadNextArticleComplete(article);
      expect(subject.isFetchingNextArticle).to.equal(false);
    });
  });

  describe('handleDocumentScrolled', () => {
    beforeEach(() => {
      sandbox.stub(window, 'requestAnimationFrame');
    });

    it('calls processScrollPosition on next animation frame', () => {
      subject.handleDocumentScrolled();
      expect(window.requestAnimationFrame).to.have.been.called;
      expect(window.requestAnimationFrame.args[0][0].name).to.equal('bound processScrollPosition');
    });

    context('when fetching the next article', () => {
      it('does nothing', () => {
        subject.isFetchingNextArticle = true;
        subject.handleDocumentScrolled();
        expect(window.requestAnimationFrame).to.not.have.been.called;
      });
    });
  });
});
