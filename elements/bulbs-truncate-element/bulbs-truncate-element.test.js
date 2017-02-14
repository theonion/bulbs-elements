describe('<bulbs-truncate-element>', () => {
  let element;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    element = document.createElement('bulbs-truncate-element');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders an <bulbs-truncate-element>', () => {
    expect(element.tagName).to.eql('BULBS-TRUNCATE-ELEMENT');
  });
});
