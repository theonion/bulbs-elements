import './bulbs-reading-list';

describe('<bulbs-reading-list>', () => {
  let subject;
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(window, 'addEventListener');
    fixture.load('bulbs-reading-list.html');
    subject = fixture.el.firstChild;
  });

  afterEach(() => {
    sandbox.restore();
    fixture.cleanup();
  });

  it('renders an <bulbs-reading-list>', () => {
    expect(subject.tagName.toLowerCase()).to.equal('bulbs-reading-list');
  });
});
