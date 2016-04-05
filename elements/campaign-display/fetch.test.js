import fetchMock from 'fetch-mock';

function rejectBadResponse(response) {
  if (response.status < 400) {
    return Promise.resolve(response);
  }
  else {
    return Promise.reject(response);
  }
}

describe('rejectBadResponse', function() {
  beforeEach(() => {
    fetchMock.mock('http://example.com/success', 'GET', 200);
    fetchMock.mock('http://example.com/redirect', 'GET', 301);
    fetchMock.mock('http://example.com/failure', 'GET', 500);
    fetchMock.mock('http://example.com/not-found', 'GET', 404);
  });

  it('resolves with a status less than 400', (done) => {
    fetch('http://example.com/success')
      .then(rejectBadResponse)
      .then(() => done());
  });

  it('does not reject with status less than 400', (done) => {
    fetch('http://example.com/success')
      .then(rejectBadResponse)
      .then(() => { expect(false).to.equal(true); done(); })
      .catch(() => done());
  });

  it('resolves with redirects', (done) => {
    fetch('http://example.com/redirect')
      .then(rejectBadResponse)
      .then(() => done());
  });

  it('rejects with a status >= 400', (done) => {
    fetch('http://example.com/not-found')
      .then(rejectBadResponse)
      .then(() => { expect(false).to.equal(true); done(); })
      .catch(() => done());
  });
});
