import './lazy-template';

describe('<script is="lazy-template">', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  function makeTemplate (innerHTML) {
    let template = document.createElement('script', 'lazy-template');
    template.setAttribute('type', 'tex/html');
    template.innerHTML = innerHTML;
    return template;
  }

  xit('requires a load-on attribute', () => {

  });

  xit('requires a type set to "text/html"', () => {

  });

  describe('replaceWithContents', () => {
    it('replaces itself with the content html', () => {
      let container = document.createElement('div');
      let template = makeTemplate(`
        <h1>Cool Template</h1>
        <p>It is lazy!</p>
      `);
      container.appendChild(template);
      template.replaceWithContents();

      expect(container.children[0].outerHTML).to.eql('<h1>Cool Template</h1>');
      expect(container.children[1].outerHTML).to.eql('<p>It is lazy!</p>');
    });
  });

  context('load-on="page-load"', () => {
    xit('sets content when page load event fires', () => {

    });

    xit('sets content immediately if page load event has fired', () => {

    });
  });

  context('load-on="in-view"', () => {
    xit('sets content when enterviewport event fires', () => {

    });
  });
});
