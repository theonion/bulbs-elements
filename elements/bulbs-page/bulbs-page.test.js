import './bulbs-page';

import util, {
  InViewMonitor,
  LockScroll,
} from 'bulbs-elements/util';

describe('<bulbs-page>', () => {
  let element;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    window.onionan = {
      trackPageView () {},
    };
    element = document.createElement('bulbs-page');
    element.setAttribute('pushstate-title', 'Pushstate Title');
    element.setAttribute('pushstate-url', '/example');
    sandbox.spy(InViewMonitor, 'add');
    sandbox.spy(InViewMonitor, 'remove');
    sandbox.stub(history, 'replaceState');
    sandbox.spy(util.getAnalyticsManager(), 'trackPageView');
    sandbox.spy(LockScroll, 'lockToElement');
    sandbox.spy(util, 'onReadyOrNow');
  });

  afterEach(() => {
    sandbox.restore();
    delete window.onionan;
  });

  describe('connectedCallback', () => {
    it('registers with InViewMonitor', () => {
      element.connectedCallback();
      expect(InViewMonitor.add).to.have.been.calledWith(element).once;
    });

    it('adds listener for pagestart', () => {
      element.connectedCallback();
      sandbox.spy(element, 'handlePageStart');
      element.dispatchEvent(new CustomEvent('pagestart'));
      expect(element.handlePageStart).to.have.been.called.once;
    });

    it('adds a document ready handler', () => {
      element.connectedCallback();
      expect(util.onReadyOrNow).to.have.been.called.once;
    });
  });

  describe('disconnectedCallback', () => {
    it('removes from InViewMonitor', () => {
      element.disconnectedCallback();
      expect(InViewMonitor.remove).to.have.been.calledWith(element).once;
    });
  });

  describe('handleDocumentReady', () => {
    context('with lock-scroll-on-load attribute set', () => {
      beforeEach(() => element.setAttribute('lock-scroll-on-load', ''));

      it('locks to element if is current page', () => {
        element.setAttribute('pushstate-url', location.pathname);
        element.handleDocumentReady();
        expect(LockScroll.lockToElement).to.have.been.calledWith(element).once;
      });

      it('is no-op if not current page', () => {
        expect(LockScroll.lockToElement).to.not.have.been.called;
      });
    });

    context('without lock-scroll-on-load-attribute set', () => {
      it('is a no-op', () => {
        expect(LockScroll.lockToElement).to.not.have.been.called;
      });
    });
  });

  describe('handlePageStart', () => {
    it('calls replaceState api', () => {
      element.handlePageStart();
      element.handlePageStart();
      requestAnimationFrame(() => {
        expect(history.replaceState).to.have.been.calledWith(
          {},
          'Pushstate Title',
          '/example',
        ).once;
      });
    });

    it('tracks a pageview', () => {
      element.handlePageStart();
      element.handlePageStart();
      requestAnimationFrame(() => {
        expect(util.getAnalyticsManager().trackPageView).to.have.been.calledWith(
          '/example',
          'Pushstate Title',
        ).once;
      });
    });
  });
});
