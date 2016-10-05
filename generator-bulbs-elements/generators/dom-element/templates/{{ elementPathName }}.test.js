describe('<<%= elementName %>>', () => {
  let element;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    element = document.createElement('<%= elementName %>');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders an <<%= elementName %>>', () => {
    expect(element.tagName).to.eql('<%= elementName.toUpperCase() %>');
  });
});
