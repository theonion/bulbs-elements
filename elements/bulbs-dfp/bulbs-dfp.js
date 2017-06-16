import util from 'bulbs-elements/util';
import invariant from 'invariant';
import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';

export default class BulbsDfp extends BulbsHTMLElement {
  attachedCallback () {

    invariant(this.hasAttribute('viewport-threshold'),
        '<div is="bulbs-dfp"> MUST specify a `viewport-threshold` property. ' +
        'This value defines how many screens away from the viewport the slot ' +
        'will be in order to trigger an ad load. 1.2 = 120% viewport height.');

    this.handleEnterViewport = this.handleEnterViewport.bind(this);
    this.handleExitViewport = this.handleExitViewport.bind(this);
    this.handleInterval = this.handleInterval.bind(this);

    this.addEventListener('enterviewport', this.handleEnterViewport);
    this.addEventListener('exitviewport', this.handleExitViewport);

    let threshold = parseFloat(this.getAttribute('viewport-threshold'), 10);
    util.InViewMonitor.add(this, {
      get distanceFromTop () {
        return -(window.innerHeight * threshold);
      },
      get distanceFromBottom () {
        return window.innerHeight * threshold;
      },
    });

    let defaultRefreshInterval = 30000;
    this.adUnitData = this.adsManager.adUnits.units[this.dataset.adUnit];
    if (!this.adUnitData.refreshDisabled && !this.hasAttribute('no-refresh')) {

      this.refreshInterval = window.setInterval(
        this.handleInterval,
        this.adUnitData.refreshInterval || defaultRefreshInterval
      );
    }
  }

  detachedCallback () {
    util.InViewMonitor.remove(this);

    if (this.refreshInterval) {
      window.clearInterval(this.refreshInterval);
    }
  }

  handleEnterViewport () {
    if(!this.trackedEnterViewport && this.adsManager && this.isViewable) {
      this.trackedEnterViewport = true;
      this.adsManager.asyncRefreshSlot(this);
    }
  }

  handleExitViewport () {
    if(!this.trackedExitViewport) {
      this.trackedExitViewport = true;
      // * The eventual strategy will be:
      //this.adsManager.unloadAds(this)
    }
  }

  handleInterval () {
    let browserVisibility = document.visibilityState;

    if (this.isViewable) {
      if (browserVisibility === 'visible') {
        util.getAnalyticsManager().sendEvent({
          eventCategory: 'bulbs-dfp-element Live Metrics',
          eventAction: '30-second-refresh-triggered-visible',
          eventLabel: this.dataset.adUnit,
        });
        this.adsManager.reloadAds(this);
        this.adsManager.refreshSlot(this);
      }
    }
  }

  get isViewable () {
    return util.InViewMonitor.isElementInViewport(this, null, {
      distanceFromTop: this.offsetHeight * 0.66,
      distanceFromBottom: -(this.offsetHeight * 0.66),
    });
  }

  get adsManager () {
    return window.BULBS_ELEMENTS_ADS_MANAGER;
  }
}

BulbsDfp.extends = 'div';

registerElement('bulbs-dfp', BulbsDfp);
