import onReadyOrNow from './on-ready-or-now';

describe('onReadyOrNow', () => {
  it('should callback now if document.readyState != "loading"', () => {
    let spy = sinon.spy();
    expect(document.readyState).to.not.eql('loading');
    onReadyOrNow(spy);
    expect(spy).to.have.been.called;
  });

  /* Again, I don't know how to mock out the document.readyState
  it('should callback when the DOMContentLoaded event fires', () => {
    let spy = sinon.spy();
    onReadyOrNow(spy);
    spy.reset();
    window.dispatchEvent(new CustomEvent('DOMContentLoaded'));
    expect(spy).to.have.been.called;
  });
  */
});
