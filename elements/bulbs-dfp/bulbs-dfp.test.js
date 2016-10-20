import util from 'bulbs-elements/util';

import './bulbs-dfp';

describe('<div is="bulbs-dfp">', () => {
  let adUnitName = 'test-unit';
  let element;
  let sandbox;
  let sendEventSpy;

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
    sandbox.stub(util, 'getAnalyticsManager', () => {
      return { sendEvent: sendEventSpy };
    });

    window.BULBS_ELEMENTS_ADS_MANAGER = {
      units: {}
    };
    window.BULBS_ELEMENTS_ADS_MANAGER.units[adUnitName] = {};

    setImmediate(() => done());
  });

  afterEach(() => {
    delete window.BULBS_ELEMENTS_ADS_MANAGER;
    sandbox.restore();
    element.remove();
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
        distanceFromTop: window.innerHeight,
        distanceFromBottom: -window.innerHeight,
      });
    });

    it('sets a refresh interval', () => {
      let refreshInterval = 30000;

      element.setAttribute('refresh-interval', '' + refreshInterval);
      element.attachedCallback();

      expect(window.setInterval).to.have.been.calledWith(element.handleInterval, refreshInterval);
    });

    it('sets a refresh interval from ads manager if not given as an attribute', () => {
      let refreshInterval = 30000;
      
      window.BULBS_ELEMENTS_ADS_MANAGER.units[adUnitName].refreshInterval = refreshInterval;
      element.attachedCallback();

      expect(window.setInterval).to.have.been.calledWith(element.handleInterval, refreshInterval);
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

  describe('what handleInterval', () => {
    it('sends a 30-second-refresh-candidate bulbs-dfp-element Metric', () => {
      element.handleInterval();
      expect(sendEventSpy).to.have.been.calledWith({
        eventCategory: 'bulbs-dfp-element Metrics',
        eventAction: '30-second-refresh-candidate',
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
          eventCategory: 'bulbs-dfp-element Metrics',
          eventAction: '30-second-refresh-triggered',
          eventLabel: adUnitName,
        });
      });
    });

    context('!isViewable', () => {
      it('does not a 30-second-refresh-triggered bulbs-dfp-element Metric', () => {
        element.handleInterval();
        expect(sendEventSpy).to.not.have.been.calledWith({
          eventCategory: 'bulbs-dfp-element Metrics',
          eventAction: '30-second-refresh-triggered',
          eventLabel: adUnitName,
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
