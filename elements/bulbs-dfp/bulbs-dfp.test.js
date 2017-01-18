import util from 'bulbs-elements/util';

import './bulbs-dfp';

describe('<div is="bulbs-dfp">', () => {
  let adUnitName = 'test-unit';
  let element;
  let sandbox;
  let sendEventSpy;
  let reloadAdsSpy;
  let refreshSlotSpy;
  let asyncRefreshSlotSpy;

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
    asyncRefreshSlotSpy = sandbox.spy();
    sandbox.stub(util, 'getAnalyticsManager', () => {
      return { sendEvent: sendEventSpy };
    });

    window.BULBS_ELEMENTS_ADS_MANAGER = {
      reloadAds: reloadAdsSpy,
      refreshSlot: refreshSlotSpy,
      asyncRefreshSlot: asyncRefreshSlotSpy,
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

  describe('connectedCallback', () => {

    it('requires a `viewport-threshold` attribute', () => {
      element.removeAttribute('viewport-threshold');
      expect(() => {
        element.connectedCallback();
      }).to.throw(
        '<div is="bulbs-dfp"> MUST specify a `viewport-threshold` property. ' +
        'This value defines how many screens away from the viewport the slot ' +
        'will be in order to trigger an ad load. 1.2 = 120% viewport height.'
      );
    });

    it('attaches enterviewport listener', () => {
      element.connectedCallback();
      expect(element.addEventListener).to.have.been.calledWith('enterviewport', element.handleEnterViewport);
    });

    it('attaches exitviewport listener', () => {
      element.connectedCallback();
      expect(element.addEventListener).to.have.been.calledWith('exitviewport', element.handleExitViewport);
    });

    it('adds self to InViewMonitor', () => {
      element.connectedCallback();
      expect(util.InViewMonitor.add).to.have.been.calledWith(element, {
        distanceFromTop: -window.innerHeight,
        distanceFromBottom: window.innerHeight,
      });
    });

    it('sets a refresh interval from ads manager', () => {
      let refreshInterval = 30000;

      window.BULBS_ELEMENTS_ADS_MANAGER.adUnits.units[adUnitName].refreshInterval = refreshInterval;
      element.connectedCallback();

      expect(window.setInterval).to.have.been.calledWith(element.handleInterval, refreshInterval);
    });

    it('ignores refresh interval if component attribute disables it', () => {
      element.setAttribute('no-refresh', '');
      element.attachedCallback();
      expect(window.setInterval.called).to.be.false;
    });

    it('ignores refresh interval if ads manager also has refreshDisabled set to true for the slot', () => {

      window.BULBS_ELEMENTS_ADS_MANAGER.adUnits.units[adUnitName].refreshInterval = 666;
      window.BULBS_ELEMENTS_ADS_MANAGER.adUnits.units[adUnitName].refreshDisabled = true;
      element.connectedCallback();

      expect(window.setInterval.called).to.be.false;
    });

    it('uses a default refresh interval of 30 seconds if not set in ads manager', () => {
      let defaultRefreshInterval = 30000;

      element.connectedCallback();

      expect(window.setInterval).to.have.been.calledWith(element.handleInterval, defaultRefreshInterval);
    });
  });

  describe('disconnectedCallback', () => {
    it('clears the refresh interval', () => {
      element.refreshInterval = 111;
      element.disconnectedCallback();
      expect(window.clearInterval).to.have.been.calledWith(111);
    });

    it('removes self from InViewMonitor', () => {
      element.disconnectedCallback();
      expect(util.InViewMonitor.remove).to.have.been.calledWith(element);
    });
  });

  describe('handleEnterViewport', () => {
    it('refreshes the slot', () => {
      element.handleEnterViewport();
      element.handleEnterViewport();
      expect(asyncRefreshSlotSpy).to.have.been.calledWith(element).once;
    });
  });

  describe('handleExitViewport', () => {
    xit('will need tests after eventual strategy rolled out', () => {

    });
  });

  describe('handleInterval', () => {

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
