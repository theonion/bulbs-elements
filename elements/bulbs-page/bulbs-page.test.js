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

    it('adds listener for pagestart', () => {
      element.attachedCallback();
      sandbox.spy(element, 'handlePageStart');
      element.dispatchEvent(new CustomEvent('pagestart'));
      expect(element.handlePageStart).to.have.been.called.once;
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

  describe('handlePageStart', () => {
    it('calls replaceState api', () => {
      mockRaf.cancel();
      element.handlePageStart();
      mockRaf.step();
      expect(history.replaceState).to.have.been.calledWith(
        {},
        'Pushstate Title',
        '/example',
      ).once;
    });

    it('tracks a pageview', () => {
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
