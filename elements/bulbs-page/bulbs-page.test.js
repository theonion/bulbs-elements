describe('<bulbs-page-state>', () => {
  let element;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    element = document.createElement('bulbs-page-state');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders an <bulbs-page-state>', () => {
    expect(element.tagName).to.eql('BULBS-PAGE-STATE');
  });
});
