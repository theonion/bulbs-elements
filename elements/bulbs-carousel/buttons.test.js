import './buttons';

let subject;

describe('<bulbs-carousel-next>', () => {
  beforeEach((done) => {
    subject = document.createElement('bulbs-carousel-next');
    // document.registerElement polyfill runs on next microtask in some browsers
    // MUST wait until end of queue for elements to be constructed
    setImmediate(done);
  });

  it('renders a next icon', () => {
    expect(subject.firstChild.matches('i.fa.fa-angle-right')).to.be.true;
  });
});

describe('<bulbs-carousel-previous>', () => {
  beforeEach((done) => {
    subject = document.createElement('bulbs-carousel-previous');
    // document.registerElement polyfill runs on next microtask in some browsers
    // MUST wait until end of queue for elements to be constructed
    setImmediate(done);
  });

  it('renders a previous icon', () => {
    expect(subject.firstChild.matches('i.fa.fa-angle-left')).to.be.true;
  });
});
