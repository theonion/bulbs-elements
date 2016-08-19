import {
  appendFixtureContainer,
  createElement,
  removeFixtures,
} from 'bulbs-elements/test/fixtures';

afterEach(() => {
  let fixtures = document.getElementById('fixtures');
  fixtures && document.body.removeChild(fixtures);
});

describe('fixtures', () => {
  describe('createElement', () => {
    it('creates an element with the given tag name', () => {
      expect(createElement('div').tagName).to.equal('DIV');
    });

    it('creates an element with the given attributes', () => {
      let element = createElement('div', { id: 'foo', className: 'bar' });
      expect(element.id).to.equal('foo');
      expect(element.className).to.equal('bar');
    });

    it('creates an element with the given data', () => {
      let element = createElement('div', { data: { foo: 'bar' } });
      expect(element.dataset.foo).to.equal('bar');
    });

    it('creates an element with the given styles', () => {
      let element = createElement('div', { style: { display: 'none' } });
      expect(element.style.display).to.equal('none');
    });
  });

  describe('appendFixtureContainer', () => {
    let fixtureContainer;
    beforeEach(() => {
      fixtureContainer = appendFixtureContainer();
    });

    it('returns a fixture element', () => {
      expect(fixtureContainer).to.be.an.instanceof(HTMLElement);
    });

    it('has an id of fixtures', () => {
      expect(fixtureContainer.id).to.equal('fixtures');
    });

    it('it is not visible in the DOM', () => {
      expect(fixtureContainer.style.display).to.equal('none');
    });

    it('appends the fixture container to the DOM', () => {
      expect(document.getElementById('fixtures')).to.exist;
    });
  });

  describe('removeFixtures', () => {
    it('removes the fixtures element from the DOM', () => {
      appendFixtureContainer();
      removeFixtures();
      expect(document.getElementById('fixtures')).to.not.exist;
    });
  });
});
