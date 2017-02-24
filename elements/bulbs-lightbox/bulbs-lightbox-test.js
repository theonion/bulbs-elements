import './bulbs-lightbox';

describe('<bulbs-lightbox>', () => {
  let lightbox;

  beforeEach((done) => {
    lightbox = document.createElement('bulbs-lightbox');
    document.body.appendChild(lightbox);
    setImmediate(() => done());
  });

  afterEach(() => {
    lightbox.remove();
  });

  describe('toggleOverlay', () => {
    it('adds active class to bulbs-lightbox', () => {
      lightbox.click();
      expect(lightbox.classList.contains('active')).to.be.true;
    });
    it('removes active class from bulbs-lightbox', () => {
      lightbox.classList.add('active');
      lightbox.click();
      expect(lightbox.classList.contains('active')).to.be.false;
    });
  });

});
