describe('<bulbs-dfp>', () => {
  let element;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    element = document.createElement('bulbs-dfp');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders an <bulbs-dfp>', () => {
    expect(element.tagName).to.eql('BULBS-DFP');
  });
});
