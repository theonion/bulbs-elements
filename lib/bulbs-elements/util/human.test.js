import Human, { init } from './human';

describe('Human', () => {
  describe('hasInteracted', () => {
    afterEach(() => {
      init();
    });

    it('is true after mousedown', () => {
      expect(Human.hasInteracted).to.be.false;
      window.dispatchEvent(new CustomEvent('mousedown'));
      expect(Human.hasInteracted).to.be.true;
    });

    it('is true after wheel', () => {
      expect(Human.hasInteracted).to.be.false;
      window.dispatchEvent(new CustomEvent('wheel'));
      expect(Human.hasInteracted).to.be.true;
    });

    it('is true after DOMMouseScroll', () => {
      expect(Human.hasInteracted).to.be.false;
      window.dispatchEvent(new CustomEvent('DOMMouseScroll'));
      expect(Human.hasInteracted).to.be.true;
    });

    it('is true after mousewheel', () => {
      expect(Human.hasInteracted).to.be.false;
      window.dispatchEvent(new CustomEvent('mousewheel'));
      expect(Human.hasInteracted).to.be.true;
    });

    it('is true after keyup', () => {
      expect(Human.hasInteracted).to.be.false;
      window.dispatchEvent(new CustomEvent('keyup'));
      expect(Human.hasInteracted).to.be.true;
    });

    it('is true after touchstart', () => {
      expect(Human.hasInteracted).to.be.false;
      window.dispatchEvent(new CustomEvent('touchstart'));
      expect(Human.hasInteracted).to.be.true;
    });

    it('is true after touchend', () => {
      expect(Human.hasInteracted).to.be.false;
      window.dispatchEvent(new CustomEvent('touchend'));
      expect(Human.hasInteracted).to.be.true;
    });

    it('is true after touchmove', () => {
      expect(Human.hasInteracted).to.be.false;
      window.dispatchEvent(new CustomEvent('touchmove'));
      expect(Human.hasInteracted).to.be.true;
    });
  });
});
