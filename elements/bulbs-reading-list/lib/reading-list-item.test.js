/* eslint no-new: 0, max-len: 0 */
import '../components/bulbs-reading-list-item';
import ReadingListItem from './reading-list-item';
import fetchMock from 'fetch-mock';
describe('ReadingListItem', () => {
  let sandbox;
  let subject;

  beforeEach(() => {
    let element;
    sandbox = sinon.sandbox.create();
    element = document.createElement('bulbs-reading-list-item');
    element.id = 'test-article';
    element.dataset.href = 'test-url';
    element.dataset.title = 'Test Article';
    subject = new ReadingListItem(element, 0);
  });

  afterEach(() => {
    fetchMock.reset();
    sandbox.restore();
  });

  it('throws an error when no element is provided', () => {
    expect(() => {
      new ReadingListItem();
    }).to.throw('ReadingListItem(element, index): element is undefined');
  });

  it('throws an error if no index is given', () => {
    expect(() => {
      let element = document.createElement('bulbs-reading-list-item');
      element.id = 'an-id';
      element.dataset.href = 'a-url';
      element.dataset.title = 'Test Article';
      new ReadingListItem(element);
    }).to.throw('ReadingListItem(element, index): index is undefined');
  });

  it('throws an error if the index is not a number', () => {
    expect(() => {
      let element = document.createElement('bulbs-reading-list-item');
      element.id = 'an-id';
      element.dataset.href = 'a-url';
      element.dataset.title = 'Test Article';
      new ReadingListItem(element, 'string');
    }).to.throw('ReadingListItem(element, index): index is not a number');
  });

  it('throws an error if the element has no id', () => {
    expect(() => {
      let element = document.createElement('div');
      new ReadingListItem(element);
    }).to.throw('ReadingListItem(element, index): element has no id');
  });

  it('throws an error if the element has no data-href', () => {
    expect(() => {
      let element = document.createElement('div');
      element.id = 'an-id';
      element.dataset.title = 'a title';
      new ReadingListItem(element);
    }).to.throw('ReadingListItem(element, index): element has no data-href');
  });

  it('throws an error if the element has no data-title', () => {
    expect(() => {
      let element = document.createElement('div');
      element.id = 'an-id';
      element.dataset.href = 'a-url';
      new ReadingListItem(element);
    }).to.throw('ReadingListItem(element, index): element has no data-title');
  });

  it('throws an error if the element is not a reading list item', () => {
    let element = document.createElement('div');
    element.id = 'an-id';
    element.dataset.href = 'a-url';
    element.dataset.title = 'Test Article';
    expect(() => {
      new ReadingListItem(element);
    }).to.throw('ReadingListItem(element, index): element must be a bulbs-reading-list-item or have a reading-list-item class');
  });

  it('has an id', () => {
    expect(subject.id).to.equal('test-article');
  });

  it('has an href', () => {
    expect(subject.href).to.equal('test-url');
  });

  it('has a title', () => {
    expect(subject.title).to.equal('Test Article');
  });

  it('saves a reference to the element', () => {
    expect(subject.element).to.be.an.instanceof(HTMLElement);
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

  it('has a loaded flag', () => {
    expect(subject.loaded).to.equal(false);
  });

  it('has a fetchPending flag', () => {
    expect(subject.fetchPending).to.equal(false);
  });

  describe('elementIsReadingListItem', () => {
    it('throws an error if no element is given', () => {
      expect(() => {
        subject.elementIsReadingListItem();
      }).to.throw('ReadingListItem.elementIsReadingListItem(element, index): element is undefined');
    });

    it('returns false if the given element is not a bulbs-reading-list-item', () => {
      let element = document.createElement('div');
      element.id = 'an-id';
      element.dataset.href = 'a-url';
      element.dataset.title = 'Test Article';
      expect(subject.elementIsReadingListItem(element)).to.equal(false);
    });

    it('returns false if the given element does not have a reading-list-item class', () => {
      let element = document.createElement('div');
      element.id = 'an-id';
      element.dataset.href = 'a-url';
      element.dataset.title = 'Test Article';
      expect(subject.elementIsReadingListItem(element)).to.equal(false);
    });

    it('returns true if the given element is a bulbs-reading-list-item', () => {
      let element = document.createElement('bulbs-reading-list-item');
      element.id = 'an-id';
      element.dataset.href = 'a-url';
      element.dataset.title = 'Test Article';
      expect(subject.elementIsReadingListItem(element)).to.equal(true);
    });

    it('returns true if the given element has a reading-list-item class', () => {
      let element = document.createElement('div');
      element.id = 'an-id';
      element.classList.add('reading-list-item');
      element.dataset.href = 'a-url';
      element.dataset.title = 'Test Article';
      expect(subject.elementIsReadingListItem(element)).to.equal(true);
    });
  });

  describe('isCurrent', () => {
    it('returns true when the element has a current class', () => {
      subject.element.classList.add('current');
      expect(subject.isCurrent()).to.equal(true);
    });

    it('returns false when the element does not have a current class', () => {
      expect(subject.isCurrent()).to.equal(false);
    });
  });

  describe('setAsCurrent', () => {
    it('adds the current class to the element', () => {
      subject.setAsCurrent();
      expect(subject.element.classList.contains('current')).to.equal(true);
    });
  });

  describe('setAsNotCurrent', () => {
    it('removes the current class on the element', () => {
      subject.element.classList.add('current');
      subject.setAsNotCurrent();
      expect(subject.element.classList.contains('current')).to.equal(false);
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

    context('when the article is already loaded', () => {
      it('does not fetch the article', () => {
        subject.loaded = true;
        subject.loadContent();
        expect(fetchMock.called(subject.href)).to.equal(false);
      });
    });

    context('when the article has a current fetch pending', () => {
      it('does not fetch the article', () => {
        subject.fetchPending = true;
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
      expect(subject.element.innerHTML).to.equal('<p>Article content</p>');
    });

    it('sets the loaded flag to true', () => {
      subject.handleLoadContentComplete(content);
      expect(subject.loaded).to.equal(true);
    });
  });

  describe('handleLoadContentError', () => {
    it('throws an error with the status code and text', () => {
      let response = new Response('', { status: 500, statusText: 'Internal Server Error' });
      expect(() => {
        subject.handleLoadContentError(response);
      }).to.throw(`ReadingListItem.loadContent(): fetch failed "${response.status} ${response.statusText}"`);
    });
  });

  describe('fillContent', () => {
    it('appends the content to the element', () => {
      subject.fillContent('<p>Test</p>');
      expect(subject.element.innerHTML).to.equal('<p>Test</p>');
    });
  });

  describe('isWithinViewThreshold', () => {
    it('returns true when the top of the elment is within the load threshold distance', () => {
      expect(subject.isWithinViewThreshold(0)).to.equal(true);
    });

    it('defaults to 0 when no scroll position is passed', () => {
      subject.loadDistanceThreshold = 0;
      expect(subject.isWithinViewThreshold()).to.equal(true);
    });
  });

  describe('shouldLoad', () => {
    it('returns false if the article is loaded', () => {
      subject.loaded = true;
      expect(subject.shouldLoad()).to.equal(false);
    });

    it('returns false if there is a current fetch pending', () => {
      subject.loaded = false;
      subject.fetchPending = true;
      expect(subject.shouldLoad()).to.equal(false);
    });
  });
});
