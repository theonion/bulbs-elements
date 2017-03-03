import debouncePerFrame from './debounce-per-frame';

describe('util debouncePerFrame', () => {
  it('debounces per frame', (done) => {
    let fn = sinon.spy();
    let debouncer = debouncePerFrame();
    debouncer(fn);
    debouncer(fn);
    requestAnimationFrame(() => {
      debouncer(fn);
      expect(fn).to.have.been.called.twice;
      done();
    });
  });
});
