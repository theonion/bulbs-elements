import './bulbs-content';

describe('<bulbs-content>', () => {
  it('emits bulbs-content-ready event when attached', () => {
    let spy = sinon.spy();
    let subject = document.createElement('bulbs-content');
    subject.addEventListener('bulbs-content-ready', spy);
    subject.connectedCallback();

    expect(spy).to.have.been.called.once;
  });

  it('does not emit bulbs-content-ready event when attached again', () => {
    let spy = sinon.spy();
    let subject = document.createElement('bulbs-content');
    subject.addEventListener('bulbs-content-ready', spy);
    subject.connectedCallback();
    subject.connectedCallback();

    expect(spy).to.have.been.called.once;
  });
});
