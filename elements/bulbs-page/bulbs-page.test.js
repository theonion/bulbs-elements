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
    sandbox.spy(history, 'replaceState');
    sandbox.spy(util.getAnalyticsManager(), 'trackPageView');
    sandbox.spy(LockScroll, 'lockToElement');
  });

  afterEach(() => {
    sandbox.restore();
    delete window.BULBS_ELEMENTS_ANALYTICS_MANAGER;
  });

  describe('attachedCallback', () => {
    it('registers with InViewMonitor', () => {
      element.attachedCallback();
      expect(InViewMonitor.add).to.have.been.calledWith(element).once;
    });
  });

  describe('detachedCallback', () => {
    it('removes from InViewMonitor', () => {
      element.detachedCallback();
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
      expect(history.replaceState).to.have.been.calledWith(
        {},
        'Pushstate Title',
        '/example',
      ).once;
    });

    it('tracks a pageview', () => {
      element.handlePageStart();
      expect(util.getAnalyticsManager().trackPageView).to.have.been.calledWith(
        '/example',
        'Pushstate Title',
      ).once;
    });
  });
});
