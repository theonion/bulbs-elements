import './lazy-template';

describe('<script is="lazy-template">', () => {
  let sandbox;
  let subject;
  let container;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    subject = makeTemplate(`
      <h1>Cool Template</h1>
      <p>It is lazy!</p>
    `);
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    sandbox.restore();
    container.remove();
  });

  function makeTemplate (innerHTML) {
    let template = document.createElement('script', 'lazy-template');
    template.setAttribute('type', 'text/html');
    template.setAttribute('load-on', 'page-load');
    template.innerHTML = innerHTML;
    return template;
  }

  it('requires a load-on attribute', () => {
    subject.removeAttribute('load-on');
    expect(() => {
      subject.attachedCallback();
    }).to.throw('<script is="lazy-template"> MUST specify a "load-on" attribute (either "page-load" or "in-view").');
  });

  it('requires a type set to "text/html"', () => {
    subject.setAttribute('type', 'text/whatever');
    expect(() => {
      subject.attachedCallback();
    }).to.throw('<script is="lazy-template"> MUST set the attribute type="text/html".');
  });

  it('requires a type attribute', () => {
    subject.removeAttribute('type');
    expect(() => {
      subject.attachedCallback();
    }).to.throw('<script is="lazy-template"> MUST set the attribute type="text/html".');
  });

  describe('replaceWithContents', () => {
    it('replaces itself with the content html', () => {
      container = document.createElement('div');
      container.appendChild(subject);
      subject.replaceWithContents();

      expect(container.children[0].outerHTML).to.eql('<h1>Cool Template</h1>');
      expect(container.children[1].outerHTML).to.eql('<p>It is lazy!</p>');
    });
  });

  context('load-on="page-load"', () => {
    beforeEach(() => subject.setAttribute('load-on', 'page-load'));

    xit('sets content when page load event fires', () => {
      // document.readyState is  'complete' by the time this test starts
      // and it can't be overwritten, not sure how to test this
    });

    it('sets content immediately if page load event has fired', (done) => {
      container.appendChild(subject);

      setImmediate(() => {
        expect(container.children[0].outerHTML).to.eql('<h1>Cool Template</h1>');
        expect(container.children[1].outerHTML).to.eql('<p>It is lazy!</p>');
        done();
      });
    });
  });

  context('load-on="in-view"', () => {
    beforeEach(() => subject.setAttribute('load-on', 'in-view'));

    it('sets content when enterviewport event fires', (done) => {
      container.appendChild(subject);

      setImmediate(() => {
        expect(container.children[0].tagName).to.eql('SCRIPT');
        subject.dispatchEvent(new CustomEvent('enterviewport'));
        expect(container.children[0].outerHTML).to.eql('<h1>Cool Template</h1>');
        expect(container.children[1].outerHTML).to.eql('<p>It is lazy!</p>');
        done();
      });
    });
  });
});
