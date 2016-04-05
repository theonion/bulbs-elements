import fetchMock from 'fetch-mock';

function filterBadResponse(response) {
  if (response.status < 400) {
    return Promise.resolve(response);
  }
  else {
    return Promise.reject(response);
  }
}

describe('filterBadResponse', function() {
  beforeEach(() => {
    fetchMock.mock('http://example.com/success', 'GET', 200);
    fetchMock.mock('http://example.com/redirect', 'GET', 301);
    fetchMock.mock('http://example.com/failure', 'GET', 500);
    fetchMock.mock('http://example.com/not-found', 'GET', 404);
  });

  it('resolves with a status less than 400', (done) => {
    fetch('http://example.com/success')
      .then(filterBadResponse)
      .then(() => done());
  });

  it('does not reject with status less than 400', (done) => {
    fetch('http://example.com/success')
      .then(filterBadResponse)
      .then(() => { expect(false).to.equal(true); done(); })
      .catch(() => done());
  });

  it('resolves with redirects', (done) => {
    fetch('http://example.com/redirect')
      .then(filterBadResponse)
      .then(() => done());
  });

  it('rejects with a status >= 400', (done) => {
    fetch('http://example.com/not-found')
      .then(filterBadResponse)
      .then(() => { expect(false).to.equal(true); done(); })
      .catch(() => done());
  });
});
