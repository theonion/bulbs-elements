import './buttons';

let subject;

describe('<bulbs-carousel-next>', () => {
  beforeEach((done) => {
    subject = document.createElement('bulbs-carousel-next');
    document.body.appendChild(subject);
    // customElements.define polyfill runs on next microtask in some browsers
    // MUST wait until end of queue for elements to be constructed
    setImmediate(done);
  });

  afterEach(() => {
    subject.remove();
  });

  it('renders a next icon', () => {
    expect(subject.firstChild.matches('i.fa.fa-angle-right')).to.be.true;
  });
});

describe('<bulbs-carousel-previous>', () => {
  beforeEach((done) => {
    subject = document.createElement('bulbs-carousel-previous');
    document.body.appendChild(subject);
    // customElements.define polyfill runs on next microtask in some browsers
    // MUST wait until end of queue for elements to be constructed
    setImmediate(done);
  });

  afterEach(() => {
    subject.remove();
  });

  it('renders a previous icon', () => {
    expect(subject.firstChild.matches('i.fa.fa-angle-left')).to.be.true;
  });
});
