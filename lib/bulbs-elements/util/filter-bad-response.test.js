import filterBadResponse from './filter-bad-response';

describe('filterBadResponse', () => {
  context('with a successful response', () => {
    it('does nothing', () => {
      expect(filterBadResponse({ ok: true })).not.to.throw;
    });
  });

  context('with an unsuccessful response', () => {
    it('throws an error with the status and status text', () => {
      let redirectResponse = { ok: false, status: 301, statusText: 'Moved Permanently' };
      let clientErrorResponse = { ok: false, status: 400, statusText: 'Bad Request' };
      let serverErrorResponse = { ok: false, status: 500, statusText: 'Internal Server Error' };

      expect(() => filterBadResponse(redirectResponse)).to.throw('Bad response: 301 - Moved Permanently');
      expect(() => filterBadResponse(clientErrorResponse)).to.throw('Bad response: 400 - Bad Request');
      expect(() => filterBadResponse(serverErrorResponse)).to.throw('Bad response: 500 - Internal Server Error');
    });
  });
});
