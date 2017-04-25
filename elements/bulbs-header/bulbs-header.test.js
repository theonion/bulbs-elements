import './bulbs-header';

describe('<bulbs-header>', () => {
  let header;
  let responsiveNav;

  beforeEach((done) => {
    header = document.createElement('bulbs-header');
    header.innerHTML = `
      <bulbs-header-masthead></bulbs-header-masthead>
      <bulbs-header-responsive-nav></bulbs-header-responsive-nav>
    `;

    responsiveNav = header.querySelector('bulbs-header-responsive-nav');

    document.body.appendChild(header);
    setImmediate(() => done());
  });

  afterEach(() => {
    header.remove();
  });

  describe('delegateExitViewport', () => {
    it('adds responsive-nav-active class to responsive-nav', () => {
      header.delegateExitViewport({ target: header.masthead });
      expect(responsiveNav.classList.contains('responsive-nav-active')).to.be.true;
    });

    it('adds responsive-nav-active class to bulbs-header', () => {
      header.delegateExitViewport({ target: header.masthead });
      expect(header.classList.contains('responsive-nav-active')).to.be.true;
    });

    it('removes masthead-active class from header', () => {
      header.classList.add('masthead-active');
      header.delegateExitViewport({ target: header.masthead });
      expect(header.classList.contains('masthead-active')).to.be.false;
    });
  });

  describe('delegateEnterViewport', () => {
    it('removes responsive-nav-active class from responsive-nav', () => {
      responsiveNav.classList.add('responsive-nav-active');
      header.delegateEnterViewport({ target: header.masthead });
      expect(responsiveNav.classList.contains('responsive-nav-active')).to.be.false;
    });

    it('removes responsive-nav-active class from responsive-nav', () => {
      responsiveNav.classList.add('responsive-nav-active');
      header.delegateEnterViewport({ target: header.masthead });
      expect(header.classList.contains('responsive-nav-active')).to.be.false;
    });

    it('adds masthead-active class to header', () => {
      header.classList.remove('masthead-active');
      header.delegateEnterViewport({ target: header.masthead });
      expect(header.classList.contains('masthead-active')).to.be.true;
    });
  });

});
