import './bulbs-header';

xdescribe('<bulbs-header>', () => {
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
  });

  describe('delegateEnterViewport', () => {
    it('removes responsive-nav-active class from responsive-nav', () => {
      responsiveNav.classList.add('responsive-nav-active');
      header.delegateEnterViewport({ target: header.masthead });
      expect(responsiveNav.classList.contains('responsive-nav-active')).to.be.false;
    });
  });
});
