import filterBadResponse from './filter-bad-response';

describe('filterBadResponse', () => {
  context('with a successful response', () => {
    it('resolves the promise', (done) => {
      filterBadResponse({ ok: true })
        .then(() => done());
    });
  });

  context('with an unsuccessful response', () => {
    it('rejects the promise', (done) => {
      filterBadResponse({ ok: false })
        .catch(() => done());
    });
  });
});
