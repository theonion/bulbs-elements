import util from 'bulbs-elements/util';

import './bulbs-dfp';

describe('<div is="bulbs-dfp">', () => {
  let element;
  let sandbox;
  let sendEventSpy;
  let reloadAdsSpy;

  beforeEach((done) => {
    sandbox = sinon.sandbox.create();
    element = document.createElement('div', 'bulbs-dfp');
    element.setAttribute('data-ad-unit', 'test-unit');
    element.setAttribute('refresh-interval', '30000');
    element.setAttribute('viewport-threshold', '1');
    sandbox.spy(element, 'addEventListener');
    sandbox.stub(window, 'setInterval');
    sandbox.stub(window, 'clearInterval');
    sandbox.stub(util.InViewMonitor, 'add');
    sandbox.stub(util.InViewMonitor, 'remove');
    sendEventSpy = sandbox.spy();
    reloadAdsSpy = sandbox.spy();
    window.BULBS_ELEMENTS_ADS_MANAGER = { reloadAds: reloadAdsSpy };
    sandbox.stub(util, 'getAnalyticsManager', () => {
      return { sendEvent: sendEventSpy };
    });

    setImmediate(() => done());
  });

  afterEach(() => {
    sandbox.restore();
    element.remove();
    delete window.BULBS_ELEMENTS_ADS_MANAGER;
  });

  describe('attachedCallback', () => {
    it('requires a `refresh-interval` attribute', () => {
      element.removeAttribute('refresh-interval');
      expect(() => {
        element.attachedCallback();
      }).to.throw(
        '<div is="bulbs-dfp>" MUST specify a `refresh-interval` attribute in ms'
      );
    });

    it('requires a `viewport-threshold` attribute', () => {
      element.removeAttribute('viewport-threshold');
      expect(() => {
        element.attachedCallback();
      }).to.throw(
        '<div is="bulbs-dfp"> MUST specify a `viewport-threshold` property. ' +
        'This value defines how many screens away from the viewport the slot ' +
        'will be in order to trigger an ad load. 1.2 = 120% viewport height.'
      );
    });

    it('sends an attached bulbs-dfp-element Metric', () => {
      element.attachedCallback();
      expect(sendEventSpy).to.have.been.calledWith({
        eventCategory: 'bulbs-dfp-element Metrics',
        eventAction: 'attached',
        eventLabel: 'test-unit',
      });
    });

    it('attaches enterviewport listener', () => {
      element.attachedCallback();
      expect(element.addEventListener).to.have.been.calledWith('enterviewport', element.handleEnterViewport);
    });

    it('attaches exitviewport listener', () => {
      element.attachedCallback();
      expect(element.addEventListener).to.have.been.calledWith('exitviewport', element.handleExitViewport);
    });

    it('adds self to InViewMonitor', () => {
      element.attachedCallback();
      expect(util.InViewMonitor.add).to.have.been.calledWith(element, {
        distanceFromTop: window.innerHeight,
        distanceFromBottom: -window.innerHeight,
      });
    });

    it('attaches a dfpSlotRenderEnded event', () => {
      element.attachedCallback();
      expect(element.addEventListener).to.have.been.calledWith('dfpSlotRenderEnded', element.handleSlotRenderEnded);
    });

    it('attaches a dfpImpressionViewabl event', () => {
      element.attachedCallback();
      expect(element.addEventListener).to.have.been
        .calledWith('dfpImpressionViewable', element.handleImpressionViewable);
    });

    it('attaches a dfpSlotOnload event', () => {
      element.attachedCallback();
      expect(element.addEventListener).to.have.been.calledWith('dfpSlotOnload', element.handleSlotOnload);
    });

    it('sets a refresh interval', () => {
      element.attachedCallback();
      expect(window.setInterval).to.have.been.calledWith(element.handleInterval, 30000);
    });
  });

  describe('detachedCallback', () => {
    it('clears the refresh interval', () => {
      element.refreshInterval = 111;
      element.detachedCallback();
      expect(window.clearInterval).to.have.been.calledWith(111);
    });

    it('removes self from InViewMonitor', () => {
      element.detachedCallback();
      expect(util.InViewMonitor.remove).to.have.been.calledWith(element);
    });
  });

  describe('handleEnterViewport', () => {
    it('sends an enterviewport bulbs-dfp-element Metric', () => {
      element.handleEnterViewport();
      element.handleEnterViewport();
      expect(sendEventSpy).to.have.been.calledWith({
        eventCategory: 'bulbs-dfp-element Metrics',
        eventAction: 'enterviewport',
        eventLabel: 'test-unit',
      }).once;
    });
  });

  describe('handleExitViewport', () => {
    it('sends an exitviewport bulbs-dfp-element Metric', () => {
      element.handleExitViewport();
      element.handleExitViewport();
      expect(sendEventSpy).to.have.been.calledWith({
        eventCategory: 'bulbs-dfp-element Metrics',
        eventAction: 'exitviewport',
        eventLabel: 'test-unit',
      }).once;
    });
  });

  describe('handleSlotRenderEnded', () => {
    it('sends a slotrendered event', () => {
      element.handleSlotRenderEnded();
      expect(sendEventSpy).to.have.been.calledWith({
        eventCategory: 'bulbs-dfp-element Metrics',
        eventAction: 'slotrenderended',
        eventLabel: 'test-unit',
      }).once;
    });
  });

  describe('handleImpressionViewable', () => {
    it('sends an impressionviewable event', () => {
      element.handleImpressionViewable();
      expect(sendEventSpy).to.have.been.calledWith({
        eventCategory: 'bulbs-dfp-element Metrics',
        eventAction: 'impressionviewable',
        eventLabel: 'test-unit',
      }).once;
    });
  });

  describe('handleSlotOnload', () => {
    it('sends a slotonload event', () => {
      element.handleSlotOnload();
      expect(sendEventSpy).to.have.been.calledWith({
        eventCategory: 'bulbs-dfp-element Metrics',
        eventAction: 'slotonload',
        eventLabel: 'test-unit',
      }).once;
    });
  });

  describe('handleInterval', () => {
    it('sends a 30-second-refresh-candidate bulbs-dfp-element Metric', () => {
      element.handleInterval();
      expect(sendEventSpy).to.have.been.calledWith({
        eventCategory: 'bulbs-dfp-element Live Metrics',
        eventAction: `30-second-refresh-candidate-${document.visibilityState}`,
        eventLabel: 'test-unit',
      });
    });

    context('isViewable', () => {
      beforeEach(() => {
        Object.defineProperty(element, 'isViewable', { get: () => { return true; } });
      });

      it('sends a 30-second-refresh-triggered bulbs-dfp-element Metric', () => {
        element.handleInterval();
        expect(sendEventSpy).to.have.been.calledWith({
          eventCategory: 'bulbs-dfp-element Live Metrics',
          eventAction: `30-second-refresh-triggered-${document.visibilityState}`,
          eventLabel: 'test-unit',
        });
      });

      it('reloads ads', () => {
        element.handleInterval();
        expect(reloadAdsSpy).to.have.been.calledWith(element).once;
      });
    });

    context('!isViewable', () => {
      it('does not a 30-second-refresh-triggered bulbs-dfp-element Metric', () => {
        element.handleInterval();
        expect(sendEventSpy).to.not.have.been.calledWith({
          eventCategory: 'bulbs-dfp-element Live Metrics',
          eventAction: `30-second-refresh-triggered-${document.visibilityState}`,
          eventLabel: 'test-unit',
        });
      });
    });
  });

  describe('isViewable', () => {
    beforeEach((done) => {
      element.style.height = '100px';
      element.style.width = '100px';
      element.style.position = 'absolute';
      element.style.background = 'black';
      element.style.left = '0px';
      document.body.appendChild(element);
      setImmediate(() => done());
    });

    it('is false when > 2/3s above top of viewport', () => {
      element.style.top = '-34px';
      expect(element.isViewable).to.be.false;
    });

    it('is true when < 2/3s above top of viewport', () => {
      element.style.top = '-33px';
      expect(element.isViewable).to.be.true;
    });

    it('is false when > 2/3s below bottom of viewport', () => {
      element.style.bottom = '-34px';
      expect(element.isViewable).to.be.false;
    });

    it('is true when < 2/3s below bottom of viewport', () => {
      element.style.bottom = '-33px';
      expect(element.isViewable).to.be.true;
    });
  });
});
