import './bulbs-header';

describe('<bulbs-header>', () => {
  let header;
  let masthead;
  let responsiveNav;

  beforeEach((done) => {
    header = document.createElement('bulbs-header');
    header.innerHTML = `
      <bulbs-header-mastead></bulbs-header-mastead>
      <bulbs-header-responsive-nav></bulbs-header-responsive-nav>
    `;

    masthead = header.querySelector('bulbs-header-masthead');
    responsiveNav = header.querySelector('bulbs-header-responsive-nav');

    document.body.appendChild(header);
    setImmediate(() => done());
  });

  afterEach(() => {
    header.remove();
  });

  describe('delegateExitViewport', () => {
    it('adds responsive-nav-active class to responsive-nav', (done) => {
      header.delegateExitViewport({target: header.masthead});
      setImmediate(() => {
        expect(responsiveNav.classList.contains('responsive-nav-active')).to.be.true;
        done();
      });
    });
  });

  describe('delegateEnterViewport', () => {
    it('removes responsive-nav-active class from responsive-nav', (done) => {
      responsiveNav.classList.add('responsive-nav-active');
      header.delegateEnterViewport({target: header.masthead});
      setImmediate(() => {
        expect(responsiveNav.classList.contains('responsive-nav-active')).to.be.false;
        done();
      });
    });
  });

});
