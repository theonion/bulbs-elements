import { createElement } from 'bulbs-elements/test/fixtures';
import './bulbs-page';
import createMockRaf from 'mock-raf';

import util, {
  InViewMonitor,
  LockScroll,
} from 'bulbs-elements/util';

describe('<bulbs-page>', () => {
  let element;
  let sandbox;
  let mockRaf;
  let contentAnalyticsDimensions;

  beforeEach(() => {
    mockRaf = createMockRaf();
    sandbox = sinon.sandbox.create();
    window.onionan = {
      trackPageView () {},
    };
    sandbox.stub(window, 'requestAnimationFrame', mockRaf.raf);
    contentAnalyticsDimensions = JSON.stringify({ 'dimension1': 'frogs' });
    element = createElement('bulbs-page', {
      data: {
        contentAnalyticsDimensions,
      },
    });
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

  describe('attachedCallback', () => {
    it('registers with InViewMonitor', () => {
      element.attachedCallback();
      expect(InViewMonitor.add).to.have.been.calledWith(element).once;
    });

    it('adds listener for inviewrect', () => {
      element.attachedCallback();
      sandbox.stub(element, 'handleInView');
      element.dispatchEvent(new CustomEvent('inviewrect'));
      expect(element.handleInView).to.have.been.called.once;
    });

    it('adds a document ready handler', () => {
      element.attachedCallback();
      expect(util.onReadyOrNow).to.have.been.called.once;
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

      it('locks to element if is current page and hash matches', () => {
        sinon.stub(element, 'isCurrentPage').returns(true);

        element.handleDocumentReady();

        expect(LockScroll.lockToElement).to.have.been.calledWith(element).once;
      });

      it('is no-op if current page but hash does not match', () => {
        sinon.stub(element, 'isCurrentPage').returns(false);

        element.handleDocumentReady();

        expect(LockScroll.lockToElement).to.not.have.been.called;
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

  describe('getElementRatioOfWindow', () => {
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);

    it('calculates ratio of window element takes up when element is over the top', () => {
      const rectBot = windowHeight - 10;
      element.cachedViewRect = {
        bottom: rectBot,
        top: -10,
      };

      const ratio = element.getElementRatioOfWindow();

      expect(ratio).to.equal(rectBot / windowHeight);
    });

    it('calculates ratio of window element takes up when element is under the bottom', () => {
      const rectTop = 10;
      element.cachedViewRect = {
        bottom: windowHeight + 10,
        top: rectTop,
      };

      const ratio = element.getElementRatioOfWindow();

      expect(ratio).to.equal((windowHeight - rectTop) / windowHeight);
    });

    it('calculates ratio of window element takes up when element is entirely in the window', () => {
      const rectHeight = windowHeight - 10;
      element.cachedViewRect = {
        bottom: windowHeight - 5,
        height: rectHeight,
        top: 5,
      };

      const ratio = element.getElementRatioOfWindow();

      expect(ratio).to.equal(rectHeight / windowHeight);
    });

    it('calculates ratio of window element takes up when element takes up the entire window or more', () => {
      element.cachedViewRect = {
        bottom: windowHeight + 5,
        top: -5,
      };

      const ratio = element.getElementRatioOfWindow();

      expect(ratio).to.be.above(1);
    });
  });

  describe('handleInViewAndInFocus', () => {

    it('calls replaceState api', () => {
      mockRaf.cancel();
      element.handleInViewAndInFocus();
      mockRaf.step();
      expect(history.replaceState).to.have.been.calledWith(
        {},
        'Pushstate Title',
        '/example',
      ).once;
    });

    it('tracks a pageview', () => {
      element.handleInViewAndInFocus();
      requestAnimationFrame(() => {
        expect(util.getAnalyticsManager().trackPageView).to.have.been.calledWith(
          '/example',
          'Pushstate Title',
        ).once;
      });
    });
  });

  describe('handleInView', () => {

    it('when multiple pages are in view, it only performs actions for the one with majority screen realestate', () => {
      const page2 = createElement('bulbs-page', {
        data: {
          contentAnalyticsDimensions: { dimension1: 'one' },
        },
      });
      const ratioInView = 0.6;
      page2.setAttribute('pushstate-title', 'Second Page');
      page2.setAttribute('pushstate-url', '/example-2');
      sinon.stub(page2, 'handleInViewAndInFocus');
      sinon.stub(page2, 'getElementRatioOfWindow').returns(ratioInView);
      sinon.stub(element, 'handleInViewAndInFocus');
      sinon.stub(element, 'getElementRatioOfWindow').returns(1 - ratioInView);
      mockRaf.cancel();

      element.handleInView({
        detail: {
          boundingRect: {},
        },
      });
      page2.handleInView({
        detail: {
          boundingRect: {},
        },
      });
      mockRaf.step();

      expect(element.handleInViewAndInFocus).to.not.have.been.called;
      expect(element.getElementRatioOfWindow).to.have.been.called;
      expect(page2.handleInViewAndInFocus).to.have.been.called;
      expect(page2.getElementRatioOfWindow).to.have.been.called;
    });
  });
});
