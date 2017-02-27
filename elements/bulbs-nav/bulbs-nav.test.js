import './bulbs-nav';

describe('bulbs-nav', () => {
  const sandbox = sinon.sandbox.create();
  let container;
  let panelA;
  let panelB;
  let toggleA;
  let toggleB;

  beforeEach((done) => {
    container = document.createElement('container');
    document.body.append(container);
    container.innerHTML = `
      <bulbs-nav-toggle nav-name="panel-a"></bulbs-nav-toggle>
      <bulbs-nav-toggle nav-name="panel-b"></bulbs-nav-toggle>

      <bulbs-nav-panel nav-name="panel-a"></bulbs-nav-panel>
      <bulbs-nav-panel nav-name="panel-b"></bulbs-nav-panel>
    `;

    panelA = container.querySelector('bulbs-nav-panel[nav-name="panel-a"]');
    panelB = container.querySelector('bulbs-nav-panel[nav-name="panel-b"]');

    toggleA = container.querySelector('bulbs-nav-toggle[nav-name="panel-a"]');
    toggleB = container.querySelector('bulbs-nav-toggle[nav-name="panel-b"]');

    setTimeout(() => done());
  });

  afterEach(() => {
    sandbox.reset();
    container.remove();
  });

  describe('<bulbs-nav-toggle>', () => {
    it('opens the corresponding panel on mouseover', () => {
      sandbox.spy(panelA, 'open');

      toggleA.dispatchEvent(new CustomEvent('mouseover'));

      expect(panelA.classList.contains('bulbs-nav-panel-active')).to.be.true;
      expect(toggleA.classList.contains('bulbs-nav-toggle-active')).to.be.true;
    });

    it('closes the other panels on mouseover', () => {
      toggleB.classList.add('bulbs-nav-panel-active');
      panelB.classList.add('bulbs-nav-panel-active');

      toggleA.dispatchEvent(new CustomEvent('mouseover'));

      expect(toggleB.classList.contains('bulbs-nav-toggle-active')).to.be.false;
      expect(panelB.classList.contains('bulbs-nav-panel-active')).to.be.false;
    });
  });

  describe('<bulbs-nav-panel>', () => {
    it('closes on mouseleave', () => {
      toggleB.classList.add('bulbs-nav-panel-active');
      panelB.classList.add('bulbs-nav-panel-active');

      panelB.dispatchEvent(new CustomEvent('mouseleave'));

      expect(toggleB.classList.contains('bulbs-nav-toggle-active')).to.be.false;
      expect(panelB.classList.contains('bulbs-nav-panel-active')).to.be.false;
    });
  });
});
