import util from 'bulbs-elements/util';

import './bulbs-dfp';

describe('<div is="bulbs-dfp">', () => {
  let adUnitName = 'test-unit';
  let element;
  let sandbox;
  let sendEventSpy;
  let reloadAdsSpy;
  let refreshSlotSpy;

  beforeEach((done) => {
    sandbox = sinon.sandbox.create();
    element = document.createElement('div', 'bulbs-dfp');
    element.setAttribute('data-ad-unit', adUnitName);
    element.setAttribute('viewport-threshold', '1');
    sandbox.spy(element, 'addEventListener');
    sandbox.stub(window, 'setInterval');
    sandbox.stub(window, 'clearInterval');
    sandbox.stub(util.InViewMonitor, 'add');
    sandbox.stub(util.InViewMonitor, 'remove');
    sendEventSpy = sandbox.spy();
    reloadAdsSpy = sandbox.spy();
    refreshSlotSpy = sandbox.spy();
    sandbox.stub(util, 'getAnalyticsManager', () => {
      return { sendEvent: sendEventSpy };
    });

    window.BULBS_ELEMENTS_ADS_MANAGER = {
      reloadAds: reloadAdsSpy,
      refreshSlot: refreshSlotSpy,
      adUnits: {
        units: {},
      },
    };
    window.BULBS_ELEMENTS_ADS_MANAGER.adUnits.units[adUnitName] = {};

    setImmediate(() => done());
  });

  afterEach(() => {
    sandbox.restore();
    element.remove();
    delete window.BULBS_ELEMENTS_ADS_MANAGER;
  });

  describe('attachedCallback', () => {

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
        eventLabel: adUnitName,
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
        distanceFromTop: -window.innerHeight,
        distanceFromBottom: window.innerHeight,
      });
    });

    it('sets a refresh interval from ads manager', () => {
      let refreshInterval = 30000;

      window.BULBS_ELEMENTS_ADS_MANAGER.adUnits.units[adUnitName].refreshInterval = refreshInterval;
      element.attachedCallback();

      expect(window.setInterval).to.have.been.calledWith(element.handleInterval, refreshInterval);
    });

    it('ignores refresh interval if ads manager also has refreshDisabled set to true for the slot', () => {

      window.BULBS_ELEMENTS_ADS_MANAGER.adUnits.units[adUnitName].refreshInterval = 666;
      window.BULBS_ELEMENTS_ADS_MANAGER.adUnits.units[adUnitName].refreshDisabled = true;
      element.attachedCallback();

      expect(window.setInterval.called).to.be.false;
    });

    it('uses a default refresh interval of 30 seconds if not set in ads manager', () => {
      let defaultRefreshInterval = 30000;

      element.attachedCallback();

      expect(window.setInterval).to.have.been.calledWith(element.handleInterval, defaultRefreshInterval);
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
        eventLabel: adUnitName,
      }).once;
      expect(refreshSlotSpy).to.have.been.calledWith(element);
    });
  });

  describe('handleExitViewport', () => {
    it('sends an exitviewport bulbs-dfp-element Metric', () => {
      element.handleExitViewport();
      element.handleExitViewport();
      expect(sendEventSpy).to.have.been.calledWith({
        eventCategory: 'bulbs-dfp-element Metrics',
        eventAction: 'exitviewport',
        eventLabel: adUnitName,
      }).once;
    });
  });

  describe('handleSlotRenderEnded', () => {
    it('sends a slotrendered event', () => {
      element.handleSlotRenderEnded();
      expect(sendEventSpy).to.have.been.calledWith({
        eventCategory: 'bulbs-dfp-element Metrics',
        eventAction: 'slotrenderended',
        eventLabel: adUnitName,
      }).once;
    });
  });

  describe('handleImpressionViewable', () => {
    it('sends an impressionviewable event', () => {
      element.handleImpressionViewable();
      expect(sendEventSpy).to.have.been.calledWith({
        eventCategory: 'bulbs-dfp-element Metrics',
        eventAction: 'impressionviewable',
        eventLabel: adUnitName,
      }).once;
    });
  });

  describe('handleSlotOnload', () => {
    it('sends a slotonload event', () => {
      element.handleSlotOnload();
      expect(sendEventSpy).to.have.been.calledWith({
        eventCategory: 'bulbs-dfp-element Metrics',
        eventAction: 'slotonload',
        eventLabel: adUnitName,
      }).once;
    });
  });

  describe('handleInterval', () => {
    it('sends a 30-second-refresh-candidate bulbs-dfp-element Metric', () => {
      element.handleInterval();
      expect(sendEventSpy).to.have.been.calledWith({
        eventCategory: 'bulbs-dfp-element Live Metrics',
        eventAction: `30-second-refresh-candidate-${document.visibilityState}`,
        eventLabel: adUnitName,
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
          eventLabel: adUnitName,
        });
      });

      it('reloads ads', () => {
        element.handleInterval();
        expect(reloadAdsSpy).to.have.been.calledWith(element).once;
      });

      it('refreshes the slot', () => {
        element.handleInterval();
        expect(refreshSlotSpy).to.have.been.calledWith(element);
      });
    });

    context('!isViewable', () => {
      it('does not a 30-second-refresh-triggered bulbs-dfp-element Metric', () => {
        element.handleInterval();
        expect(sendEventSpy).to.not.have.been.calledWith({
          eventCategory: 'bulbs-dfp-element Live Metrics',
          eventAction: `30-second-refresh-triggered-${document.visibilityState}`,
          eventLabel: adUnitName,
        });
      });
    });
  });

  describe('isViewable', () => {
    beforeEach((done) => {
      element.style.height = '100px';
      element.style.width = '100px';
      element.style.position = 'fixed';
      element.style.background = 'black';
      element.style.top = '0';
      element.style.left = '0';
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
      element.style.top = '';
      element.style.bottom = '-35px';
      expect(element.isViewable).to.be.false;
    });

    it('is true when < 2/3s below bottom of viewport', () => {
      element.style.top = '';
      element.style.bottom = '-33px';
      expect(element.isViewable).to.be.true;
    });
  });
});
