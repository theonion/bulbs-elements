import './bulbs-flyover-menu';

describe('bulbs-flyover-menu', () => {
  let container;
  let subject;
  let openButton;
  let closeButton;

  beforeEach((done) => {
    container = document.createElement('div');
    container.innerHTML = `
      <button
        is="bulbs-flyover-open"
        menu-name="example-menu"
      >
        <i class="fa fa-bars" aria-hidden="true"></i>
      </button>
      <bulbs-flyover-menu menu-name="example-menu">
        <button
          is="bulbs-flyover-close"
          menu-name="example-menu"
        >
          +
        </button>

        <h1>
          HOT LINKS
        </h2>

        <p>
          GET YOUR HOT LINKS RIGHT HERE
        </p>

        <nav>
          <a href="#">Hot</a>
          <a href="#">Red Hot</a>
          <a href="#">Super Hot</a>
          <a href="#">Hot Hot Hot</a>
          <a href="#">It's A Hot One</a>
        </div>
      </bulbs-flyover-menu>
    `;

    subject = container.querySelector('bulbs-flyover-menu');
    openButton = container.querySelector('[is="bulbs-flyover-open"]');
    closeButton = container.querySelector('[is="bulbs-flyover-close"]');

    document.body.appendChild(container);
    setImmediate(() => done());
  });

  afterEach(() => {
    container.remove();
  });

  describe('openFlyover', () => {
    it('updates aria metadata', () => {
      openButton.setAttribute('aria-expanded', 'false');
      subject.openFlyover();
      expect(openButton.getAttribute('aria-expanded')).to.eql('true');
    });

    it('adds open class to menu', () => {
      subject.classList.remove('bulbs-flyover-open');
      subject.openFlyover();
      expect(subject.classList.contains('bulbs-flyover-open')).to.be.true;
    });
  });

  describe('closeFlyover', () => {
    it('updates aria metadata', () => {
      openButton.setAttribute('aria-expanded', 'true');
      subject.closeFlyover();
      expect(openButton.getAttribute('aria-expanded')).to.eql('false');
    });

    it('removes open class from menu', () => {
      subject.classList.add('bulbs-flyover-open');
      subject.closeFlyover();
      expect(subject.classList.contains('bulbs-flyover-open')).to.be.false;
    });
  });

  describe('[noscroll-flyout-active]', () => {
    beforeEach(() => subject.setAttribute('no-body-scroll', ''));

    describe('openFlyover', () => {
      it('adds noscroll-flyout-active to body', () => {
        document.body.classList.remove('noscroll-flyout-active');
        subject.openFlyover();
        expect(document.body.classList.contains('noscroll-flyout-active')).to.be.true;
      });

      it('adds noscroll-flyout-active to document element', () => {
        document.documentElement.classList.remove('noscroll-flyout-active');
        subject.openFlyover();
        expect(document.documentElement.classList.contains('noscroll-flyout-active')).to.be.true;
      });
    });

    describe('closeFlyover', () => {
      it('removes noscroll-flyout-active from body', () => {
        document.body.classList.add('noscroll-flyout-active');
        subject.closeFlyover();
        expect(document.body.classList.contains('noscroll-flyout-active')).to.be.false;
      });

      it('removes noscroll-flyout-active from document element', () => {
        document.documentElement.classList.add('noscroll-flyout-active');
        subject.closeFlyover();
        expect(document.documentElement.classList.contains('noscroll-flyout-active')).to.be.false;
      });
    });
  });

  describe('<button is="bulbs-flyover-open">', () => {
    it('sets default aria metadatat', () => {
      expect(openButton.getAttribute('aria-haspopup')).to.eql('true');
      expect(openButton.getAttribute('aria-expanded')).to.eql('false');
    });

    it('opens menu on click', () => {
      sinon.spy(subject, 'openFlyover');
      openButton.click();
      expect(subject.openFlyover).to.have.been.called;
    });
  });

  describe('<button is="bulbs-flyover-close">', () => {
    it('closes menu on click', () => {
      sinon.spy(subject, 'closeFlyover');
      closeButton.click();
      expect(subject.closeFlyover).to.have.been.called;
    });
  });
});
