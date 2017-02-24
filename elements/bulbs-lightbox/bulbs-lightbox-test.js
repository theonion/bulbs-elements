import './bulbs-lightbox';

describe('<bulbs-lightbox>', () => {
  let lightbox;

  beforeEach((done) => {
    lightbox = document.createElement('bulbs-lightbox');
    document.body.appendChild(lightbox);
    window.picturefill = sinon.spy();
    setImmediate(() => done());
  });

  afterEach(() => {
    delete window.picturefill;
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
    it('calls picturefill when active class is added', () => {
      lightbox.click();
      expect(window.picturefill).to.have.been.called;
    });
  });

});
