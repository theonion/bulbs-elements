describe('<bulbs-scroll-top>', () => {
  let element;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    element = document.createElement('bulbs-scroll-top');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders an <bulbs-scroll-top>', () => {
    expect(element.tagName).to.eql('BULBS-SCROLL-TOP');
  });
});
