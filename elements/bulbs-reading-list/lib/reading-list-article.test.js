import fetchMock from 'fetch-mock';
import '../components/bulbs-reading-list-item';
import ReadingListArticle from 'reading-list-article';
import ReadingListItem from 'reading-list-item';

describe('ReadingListArticle', () => {
  let sandbox;
  let subject;

  beforeEach(() => {
    let element;
    sandbox = sinon.sandbox.create();
    element = document.createElement('bulbs-reading-list-item');
    element.id = 'test-article';
    element.dataset.href = 'test-url';
    element.dataset.title = 'Test Article';
    subject = new ReadingListArticle(element, 0);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('extends ReadingListItem', () => {
    expect(subject).to.be.an.instanceof(ReadingListItem);
  });

  it('loadDistanceThreshold', () => {
    expect(subject.loadDistanceThreshold).to.be.a('number');
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
  });

  describe('handleLoadContentComplete', () => {
    let content;
    beforeEach(function() {
      content = '<p>Article content</p>';
    });

    it('fills the content', () => {
      subject.handleLoadContentComplete(content);
      expect(subject.element.innerHTML).to.equal('<p>Article content</p>');
    });
  });

  describe('handleLoadContentError', () => {
    it('throws an error with the status code and text', () => {
      let response = new Response('', { status: 500, statusText: 'Internal Server Error' });
      expect(() => {
        subject.handleLoadContentError(response);
      }).to.throw(`ReadingListArticle.loadContent(): fetch failed "${response.status} ${response.statusText}"`);
    });
  });

  describe('fillContent', () => {
    it('appends the content to the element', () => {
      subject.fillContent('<p>Test</p>');
      expect(subject.element.innerHTML).to.equal('<p>Test</p>');
    });
  });

  describe('isWithinLoadDistanceThreshold', () => {
    it('returns true when the top of the elment is within the load threshold distance', () => {
      expect(subject.isWithinLoadDistanceThreshold(0)).to.equal(true);
    });
  });
});
