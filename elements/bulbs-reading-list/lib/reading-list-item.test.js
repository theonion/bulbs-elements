/* eslint no-new: 0 */
import '../components/bulbs-reading-list-item';
import ReadingListItem from './reading-list-item';
import fetchMock from 'fetch-mock';
describe('ReadingListItem', () => {
  let sandbox;
  let subject;
  let menuElement;
  let articleElement;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(window, 'addEventListener');
    menuElement = document.createElement('bulbs-reading-list-item');
    menuElement.dataset.id = '1';
    menuElement.dataset.href = 'test-url';
    menuElement.dataset.title = 'Test Article';
    articleElement = document.createElement('bulbs-reading-list-item');
    articleElement.dataset.id = '1';
    articleElement.dataset.href = 'test-url';
    articleElement.dataset.title = 'Test Article';
    subject = new ReadingListItem(menuElement, articleElement, 0);
  });

  afterEach(() => {
    fetchMock.reset();
    sandbox.restore();
  });

  it('throws an error when no menuElement is provided', () => {
    expect(() => {
      new ReadingListItem();
    }).to.throw('ReadingListItem(menuElement, articleElement, index): menuElement is undefined');
  });

  it('throws an error if no index is given', () => {
    expect(() => {
      new ReadingListItem(menuElement, articleElement);
    }).to.throw('ReadingListItem(menuElement, articleElement, index): index is undefined');
  });

  it('throws an error if the index is not a number', () => {
    expect(() => {
      new ReadingListItem(menuElement, articleElement, 'string');
    }).to.throw('ReadingListItem(menuElement, articleElement, index): index is not a number');
  });

  it('throws an error if the menuElement has no id', () => {
    expect(() => {
      menuElement = document.createElement('div');
      new ReadingListItem(menuElement, articleElement, 0);
    }).to.throw('ReadingListItem(menuElement, articleElement, index): menuElement has no data-id');
  });

  it('throws an error if the menuElement has no data-href', () => {
    expect(() => {
      menuElement = document.createElement('div');
      menuElement.dataset.id = '1';
      menuElement.dataset.title = 'a title';
      new ReadingListItem(menuElement, articleElement, 0);
    }).to.throw('ReadingListItem(menuElement, articleElement, index): menuElement has no data-href');
  });

  it('throws an error if the menuElement has no data-title', () => {
    expect(() => {
      menuElement = document.createElement('div');
      menuElement.dataset.id = '1';
      menuElement.dataset.href = 'a-url';
      new ReadingListItem(menuElement, articleElement, 0);
    }).to.throw('ReadingListItem(menuElement, articleElement, index): menuElement has no data-title');
  });

  it('throws an error if the menuElement is not a reading list item', () => {
    menuElement = document.createElement('div');
    menuElement.dataset.id = '1';
    menuElement.dataset.href = 'a-url';
    menuElement.dataset.title = 'Test Article';
    expect(() => {
      new ReadingListItem(menuElement, articleElement, 0);
    }).to.throw('ReadingListItem(menuElement, articleElement, index): menuElement must be a bulbs-reading-list-item or have a reading-list-item class');
  });

  it('has an id', () => {
    expect(subject.id).to.equal('1');
  });

  it('has an href', () => {
    expect(subject.href).to.equal('test-url');
  });

  it('has a title', () => {
    expect(subject.title).to.equal('Test Article');
  });

  it('saves a reference to the menuElement', () => {
    expect(subject.menuElement).to.be.an.instanceof(HTMLElement);
  });

  it('has a index', () => {
    expect(subject.index).to.equal(0);
  });

  it('extends ReadingListItem', () => {
    expect(subject).to.be.an.instanceof(ReadingListItem);
  });

  it('loadDistanceThreshold', () => {
    expect(subject.loadDistanceThreshold).to.be.a('number');
  });

  it('has a fetchPending flag', () => {
    expect(subject.fetchPending).to.equal(false);
  });

  it('has a loadingTemplate', () => {
    expect(subject.loadingTemplate).to.equal('<p class="reading-list-article-loading">Loading...</p>');
  });

  it('has an isCurrent flag', () => {
    expect(subject.isCurrent).to.equal(false);
  });

  describe('isLoaded', () => {
    it('returns true if the item has article content', () => {
      subject.fillContent('<p>Not empty</p>');
      expect(subject.isLoaded()).to.equal(true);
    });
  });

  describe('elementIsReadingListItem', () => {
    it('throws an error if no element is given', () => {
      expect(() => {
        subject.elementIsReadingListItem();
      }).to.throw('ReadingListItem.elementIsReadingListItem(element): element is undefined');
    });

    it('returns false if the given element is not a bulbs-reading-list-item', () => {
      let element = document.createElement('div');
      element.dataset.id = '1';
      element.dataset.href = 'a-url';
      element.dataset.title = 'Test Article';
      expect(subject.elementIsReadingListItem(element)).to.equal(false);
    });

    it('returns false if the given element does not have a reading-list-item class', () => {
      let element = document.createElement('div');
      element.dataset.id = '1';
      element.dataset.href = 'a-url';
      element.dataset.title = 'Test Article';
      expect(subject.elementIsReadingListItem(element)).to.equal(false);
    });

    it('returns true if the given element is a bulbs-reading-list-item', () => {
      let element = document.createElement('bulbs-reading-list-item');
      element.dataset.id = '1';
      element.dataset.href = 'a-url';
      element.dataset.title = 'Test Article';
      expect(subject.elementIsReadingListItem(element)).to.equal(true);
    });

    it('returns true if the given element has a reading-list-item class', () => {
      let element = document.createElement('div');
      element.dataset.id = '1';
      element.classList.add('reading-list-item');
      element.dataset.href = 'a-url';
      element.dataset.title = 'Test Article';
      expect(subject.elementIsReadingListItem(element)).to.equal(true);
    });
  });

  describe('setAsCurrent', () => {
    it('adds the current class to the menuElement', () => {
      subject.setAsCurrent();
      expect(subject.menuElement.classList.contains('current')).to.equal(true);
    });

    it('adds the current class to the articleElement', () => {
      subject.setAsCurrent();
      expect(subject.articleElement.classList.contains('current')).to.equal(true);
    });

    it('sets the isCurrent flag to true', () => {
      subject.setAsCurrent();
      expect(subject.isCurrent).to.equal(true);
    });
  });

  describe('setAsNotCurrent', () => {
    it('removes the current class on the menuElement', () => {
      subject.menuElement.classList.add('current');
      subject.setAsNotCurrent();
      expect(subject.menuElement.classList.contains('current')).to.equal(false);
    });

    it('removes the current class on the articleElement', () => {
      subject.articleElement.classList.add('current');
      subject.setAsNotCurrent();
      expect(subject.articleElement.classList.contains('current')).to.equal(false);
    });

    it('sets the isCurrent flag to false', () => {
      subject.setAsNotCurrent();
      expect(subject.isCurrent).to.equal(false);
    });
  });

  describe('loadContent', () => {
    let body;

    beforeEach(() => {
      body = '<p>Article Content</p>';
      fetchMock.mock(subject.href, body);
    });

    it('fetches the content', () => {
      subject.loadContent();
      expect(fetchMock.called(subject.href)).to.equal(true);
    });

    it('returns a promise', () => {
      let promise = subject.loadContent();
      expect(promise).to.be.an.instanceof(Promise);
    });

    it('sets the innerHTML to the loading template', () => {
      sandbox.stub(subject, 'handleLoadContentComplete');
      subject.loadContent();
      expect(subject.articleElement.innerHTML).to.equal(subject.loadingTemplate);
    });

    context('when the article is already loaded', () => {
      beforeEach(() => {
        sandbox.stub(subject, 'isLoaded').returns(true);
      });

      it('does not fetch the article', () => {
        subject.loadContent();
        expect(fetchMock.called(subject.href)).to.equal(false);
      });

      it('returns a rejected promise', (done) => {
        subject.loadContent().catch((message) => {
          expect(message).to.equal('Article should not load');
          done();
        });
      });
    });

    context('when the article should not load', () => {
      it('does not fetch the article', () => {
        sandbox.stub(subject, 'shouldLoad').returns(false);
        subject.loadContent();
        expect(fetchMock.called(subject.href)).to.equal(false);
      });
    });
  });

  describe('handleLoadContentComplete', () => {
    let content;
    beforeEach(() => {
      content = '<p>Article content</p>';
    });

    it('fills the content', () => {
      subject.handleLoadContentComplete(content);
      expect(subject.articleElement.innerHTML).to.equal('<p>Article content</p>');
    });
  });

  describe('handleLoadContentError', () => {
    it('returns a rejected promise with the status code and text', (done) => {
      let response = new Response('', { status: 500, statusText: 'Internal Server Error' });
      subject.handleLoadContentError(response)
        .catch((message) => {
          expect(message).to.equal(`ReadingListItem.loadContent(): fetch failed "${response.status} ${response.statusText}"`);
          done();
        });
    });
  });

  describe('fillContent', () => {
    it('appends the content to the articleElement', () => {
      subject.fillContent('<p>Test</p>');
      expect(subject.articleElement.innerHTML).to.equal('<p>Test</p>');
    });
  });

  describe('isWithinViewThreshold', () => {
    it('returns true when the top of the articleElement is within the load threshold distance', () => {
      expect(subject.isWithinViewThreshold(0)).to.equal(true);
    });

    it('defaults to 0 when no scroll position is passed', () => {
      subject.loadDistanceThreshold = 0;
      expect(subject.isWithinViewThreshold()).to.equal(true);
    });
  });

  describe('shouldLoad', () => {
    it('returns false if the article is already loaded', () => {
      sandbox.stub(subject, 'isLoaded').returns(true);
      expect(subject.shouldLoad()).to.equal(false);
    });

    it('returns false if there is a current fetch pending', () => {
      sandbox.stub(subject, 'isLoaded').returns(false);
      subject.fetchPending = true;
      expect(subject.shouldLoad()).to.equal(false);
    });
  });

  describe('scrollIntoView', () => {
    it('scrolls the article element into view', () => {
      sandbox.stub(subject.articleElement, 'scrollIntoView');
      subject.scrollIntoView();
      expect(subject.articleElement.scrollIntoView).to.have.been.called;
    });
  });
});
