import './bulbs-tabs';

describe('bulbs-tabs', () => {
  const sandbox = sinon.sandbox.create();
  let container;
  let itemA;
  let itemB;
  let contentA;
  let contentB;

  beforeEach((done) => {
    container = document.createElement('container');
    document.body.append(container);
    container.innerHTML = `
      <bulbs-tabs>
        <bulbs-tab-strip>
          <bulbs-tab-item tab-name="a"></bulbs-tab-item>
          <bulbs-tab-item tab-name="b"></bulbs-tab-item>
        </bulbs-tab-strip>
        <bulbs-tab-content tab-name="a"></bulbs-tab-content>
        <bulbs-tab-content tab-name="b"></bulbs-tab-content>
      </bulbs-tabs>
    `;

    itemA = container.querySelector('bulbs-tab-item[tab-name="a"]');
    itemB = container.querySelector('bulbs-tab-item[tab-name="b"]');

    contentA = container.querySelector('bulbs-tab-content[tab-name="a"]');
    contentB = container.querySelector('bulbs-tab-content[tab-name="b"]');

    setImmediate(() => done());
  });

  afterEach(() => {
    sandbox.reset();
    container.remove();
  });

  describe('bulbs-tabs', () => {
    it('automatically selects the first tab', () => {
      expect(itemA.classList.contains('bulbs-tab-item-active')).to.be.true;
      expect(contentA.classList.contains('bulbs-tab-content-active')).to.be.true;
    });
  });

  describe('bulbs-tab-item', () => {
    it('selects a tab on click', () => {
      itemB.click();

      expect(itemB.classList.contains('bulbs-tab-item-active')).to.be.true;
      expect(contentB.classList.contains('bulbs-tab-content-active')).to.be.true;
    });

    it('deselects other tabs on click', () => {
      itemB.click();

      expect(itemA.classList.contains('bulbs-tab-item-active')).to.be.false;
      expect(contentA.classList.contains('bulbs-tab-content-active')).to.be.false;
    });
  });
});
