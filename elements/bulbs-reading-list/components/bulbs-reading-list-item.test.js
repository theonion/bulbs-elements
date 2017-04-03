import './bulbs-reading-list-item';
import fetchMock from 'fetch-mock';
import util from 'bulbs-elements/util';

describe('BulbsReadingListItem', () => {
  let expected;
  let markdownText;
  let response;
  let sandbox;
  let subject;

  beforeEach(() => {
    subject = document.createElement('bulbs-reading-list-item');
    subject.setAttribute('data-id', 1);
    subject.setAttribute('data-href', 'www.foobar.com');
    subject.setAttribute('data-partial-url', '/article/funny-article-12?partial=true');
    subject.setAttribute('data-title', 'Fun at the Beach');
    subject.setAttribute('data-content-analytics-dimensions',
      '{ "dimension1": "dimension1", "dimension2": "dimension2"}'
    );
    window.GOOGLE_ANALYTICS_ID = '1234';
    markdownText = '<bulbs-reading-list-item> requires attribute: ';

    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    subject.remove();
    sandbox.restore();
    fetchMock.restore();
  });

  context('requires attribute: ', () => {
    it('data-id', () => {
      subject.removeAttribute('data-id');
      expect(() => {
        subject.attachedCallback();
      }).to.throw(markdownText + 'data-id');
    });
    it('data-href', () => {
      subject.removeAttribute('data-href');
      expect(() => {
        subject.attachedCallback();
      }).to.throw(markdownText + 'data-href');
    });
    it('data-partial-url', () => {
      subject.removeAttribute('data-partial-url');
      expect(() => {
        subject.attachedCallback();
      }).to.throw(markdownText + 'data-partial-url');
    });
    it('data-title', () => {
      subject.removeAttribute('data-title');
      expect(() => {
        subject.attachedCallback();
      }).to.throw(markdownText + 'data-title');
    });
    it('data-content-analytics-dimensions', () => {
      subject.removeAttribute('data-content-analytics-dimensions');
      expect(() => {
        subject.attachedCallback();
      }).to.throw(markdownText + 'data-content-analytics-dimensions');
    });
  });

  it('requires GOOGLE_ANALYTICS_ID set on the window', () => {
    window.GOOGLE_ANALYTICS_ID = undefined; // eslint-disable-line no-undefined
    expect(() => {
      subject.attachedCallback();
    }).to.throw('<bulbs-reading-list-item> requires GOOGLE_ANALYTICS_ID set on the window');
  });

  describe('#loadOnInitialization', () => {
    it('calls load content if isLoaded attribute not set', () => {
      sandbox.stub(util.InViewMonitor, 'isElementInViewport').returns(true);
      sandbox.stub(subject, 'loadContent');
      subject.attachedCallback();
      expect(subject.loadContent).to.be.called.once;
    });

    it('does nothing if isLoaded attribute set', () => {
      subject.setAttribute('data-is-loaded', '');
      sandbox.stub(util.InViewMonitor, 'isElementInViewport').returns(true);
      sandbox.stub(subject, 'loadContent');
      subject.attachedCallback();
      expect(subject.loadContent.called).to.be.false;
    });
  });

  describe('#getGaDimensions', () => {
    it('maps dimensions into object', () => {
      response = subject.getGaDimensions();
      expected = {
        'dimension1': 'dimension1',
        'dimension2': 'dimension2',
        'dimension3': 'None',
        'dimension4': 'None',
        'dimension5': 'None',
        'dimension6': 'None',
        'dimension7': 'None',
        'dimension8': 'None',
        'dimension9': 'None',
        'dimension10': 'None',
        'dimension11': 'None',
        'dimension12': 'None',
        'dimension13': 'None',
      };
      expect(response).to.eql(expected);
    });
  });

  describe('#shouldLoad', () => {
    it('returns true when subject isLoaded and fetchPending false', () => {
      subject.isLoaded = false;
      subject.fetchPending = false;
      expect(subject.shouldLoad()).to.be.true;
    });
    it('returns false when subject isLoaded or fetchPending false', () => {
      subject.isLoaded = true;
      subject.fetchPending = false;
      expect(subject.shouldLoad()).to.be.false;
      subject.isLoaded = false;
      subject.fetchPending = true;
      expect(subject.shouldLoad()).to.be.false;
    });
  });

  describe('#fillContent', () => {
    it('fills subject innerHTML', () => {
      let content = 'wazup';
      subject.fillContent(content);
      expect(subject.innerHTML).to.eql(content);
    });
    it('sets loadStatus to loading', () => {
      let content = 'wazup';
      subject.fillContent(content);
      expect(subject.dataset.loadStatus).to.eql('loading');
    });
  });

  describe('#handleLoadContentComplete', () => {
    beforeEach(() => {
      sandbox.stub(subject, 'fillContent');
      subject.handleLoadContentComplete();
    });
    afterEach(() => {
      sandbox.restore();
    });
    it('calls fillContent', () => {
      expect(subject.fillContent).to.be.called.once;
    });
    it('sets subject.isLoaded', () => {
      expect(subject.isLoaded).to.be.true;
    });
    it('sets subject.fetchPending', () => {
      expect(subject.fetchPending).to.be.false;
    });
    it('sets load status', () => {
      expect(subject.dataset.loadStatus).to.eql('loaded');
    });
  });
});
