import onReadyOrNow './on-ready-or-now';

describe('onReadyOrNow', () => {
  let sandbox = sinon.sandbox.create();

  afterEach(() => sandbox.reset());

  it('should callback now if document.readyState != "loading"', () => {
    let spy = sandbox.spy();
    expect(document.readyState).to.not.eql('loading');
    onReadyOrNow(spy);
    expect(spy).to.have.been.called;
  });

  it('should callback when the DOMContentLoaded event fires', () => {
    let spy = sandbox.spy();
    sandbox.stub(onReadyOrNow, 'getDocumentReadyState', () => 'interactive');
    onReadyOrNow(spy);
    spy.reset();
    window.dispatchEvent(new CustomEvent('DOMContentLoaded'));
    expect(spy).to.have.been.called;
  });
});
