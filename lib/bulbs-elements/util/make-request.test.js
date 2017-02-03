import makeRequest from './make-request';
import { resetCache } from './cached-fetch';
import fetchMock from 'fetch-mock';

describe('makeRequest', () => {
  let testUrl;
  let callbacks;
  let response;

  beforeEach(() => {
    testUrl = 'http://example.com';
    response = {
      status: 200,
      body: JSON.stringify({}),
    };
    callbacks = {
      success: sinon.spy(),
      error: sinon.spy(),
    };
  });

  afterEach(function () {
    fetchMock.restore();
    resetCache();
  });

  it('requires a success callback', () => {
    expect(() => {
      makeRequest(testUrl, {
        error: callbacks.error,
      });
    }).to.throw('makeRequest MUST have a success callback');
  });

  it('requires an error callback', () => {
    expect(() => {
      makeRequest(testUrl, {
        success: callbacks.success,
      });
    }).to.throw('makeRequest MUST have an error callback');
  });

  it('fetches the url', () => {
    fetchMock.mock(testUrl, {});
    makeRequest(testUrl, callbacks);
    expect(fetchMock.called(testUrl)).to.equal(true);
  });

  context('successful response', () => {
    beforeEach(() => {
      fetchMock.mock(testUrl, response);
    });

    it('invokes the success callback', (done) => {
      makeRequest(testUrl, callbacks).then(() => {
        expect(callbacks.success).to.have.been.called;
        done();
      });
    });

    it('does not invoke the error callbacks', (done) => {
      makeRequest(testUrl, callbacks).then(() => {
        expect(callbacks.error).to.not.have.been.called;
        done();
      });
    });
  });

  context('error response', () => {
    beforeEach(() => {
      fetchMock.mock(testUrl, window.Promise.reject('Bad Network'));
    });

    it('does not invoke the success callbacks', (done) => {
      callbacks.success = sinon.spy();
      callbacks.error = sinon.spy();
      makeRequest(testUrl, callbacks).catch(() => {
        expect(callbacks.success).to.not.have.been.called;
        done();
      });
    });

    it('invokes the error callback', (done) => {
      makeRequest(testUrl, callbacks).catch(() => {
        expect(callbacks.error).to.have.been.called;
        done();
      });
    });
  });
});
