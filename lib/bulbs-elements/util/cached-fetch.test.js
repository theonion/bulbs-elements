import cachedFetch, { resetCache } from './cached-fetch';
import fetchMock from 'fetch-mock';

describe('cachedFetch', () => {
  afterEach(() => {
    resetCache();
  });

  it('caches calls to fetch', (done) => {
    let url = 'http://example.org/cool-endpoint';
    let response = {};
    let callbacks = {
      success: () => {},
      error: () => {},
    };
    fetchMock.mock(url, response);
    Promise.all([
      cachedFetch(url, callbacks),
      cachedFetch(url, callbacks),
    ])
    .then(() => {
      expect(fetchMock.calls().matched.length).to.equal(1);
      done();
    });
  });
});
