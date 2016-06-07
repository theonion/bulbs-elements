import makeRequest from './make-request';
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
      failure: sinon.spy(),
    };
  });

  afterEach(function() {
    fetchMock.restore();
  });

  it('requires a success callback', () => {
    expect(() => {
      makeRequest(testUrl, {
        failure: callbacks.failure,
        error: callbacks.error,
      });
    }).to.throw('makeRequest MUST have a success callback');
  });

  it('requires a failure callback', () => {
    expect(() => {
      makeRequest(testUrl, {
        success: callbacks.success,
        error: callbacks.error,
      });
    }).to.throw('makeRequest MUST have a failure callback');
  });

  it('requires an error callback', () => {
    expect(() => {
      makeRequest(testUrl, {
        failure: callbacks.failure,
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

    it('does not invoke the failure or error callbacks', (done) => {
      makeRequest(testUrl, callbacks).then(() => {
        expect(callbacks.error).to.not.have.been.called;
        expect(callbacks.failure).to.not.have.been.called;
        done();
      });
    });
  });

  context('failure response', () => {
    beforeEach(() => {
      response.status = 404;
      fetchMock.mock(testUrl, response);
    });

    it('invokes the failure callback', (done) => {
      makeRequest(testUrl, callbacks).then(() => {
        expect(callbacks.failure).to.have.been.called;
        done();
      });
    });

    it('does not invoke the success or error callbacks', (done) => {
      makeRequest(testUrl, callbacks).then(() => {
        expect(callbacks.error).to.not.have.been.called;
        expect(callbacks.success).to.not.have.been.called;
        done();
      });
    });
  });

  context('error response', () => {
    beforeEach(() => {
      fetchMock.mock(testUrl, window.Promise.reject('Bad Network'));
    });

    it('invokes the error callback', (done) => {
      makeRequest(testUrl, callbacks).then(() => {
        expect(callbacks.error).to.have.been.called;
        done();
      });
    });

    it('does not invoke the success or failure callbacks', (done) => {
      makeRequest(testUrl, callbacks).then(() => {
        expect(callbacks.success).to.not.have.been.called;
        expect(callbacks.failure).to.not.have.been.called;
        done();
      });
    });
  });
});
