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

    util.getAnalyticsManager().sendEvent({
      eventCategory: 'bulbs-dfp-element Metrics',
      eventAction: 'attached',
      eventLabel: this.dataset.adUnit,
    });

    this.handleEnterViewport = this.handleEnterViewport.bind(this);
    this.handleExitViewport = this.handleExitViewport.bind(this);
    this.handleInterval = this.handleInterval.bind(this);
    this.handleSlotRenderEnded = this.handleSlotRenderEnded.bind(this);
    this.handleImpressionViewable = this.handleImpressionViewable.bind(this);
    this.handleSlotOnload = this.handleSlotOnload.bind(this);

    this.addEventListener('enterviewport', this.handleEnterViewport);
    this.addEventListener('exitviewport', this.handleExitViewport);
    this.addEventListener('dfpSlotRenderEnded', this.handleSlotRenderEnded);
    this.addEventListener('dfpImpressionViewable', this.handleImpressionViewable);
    this.addEventListener('dfpSlotOnload', this.handleSlotOnload);

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
    if (!this.adUnitData.refreshDisabled) {

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
    if(!this.trackedEnterViewport) {
      this.trackedEnterViewport = true;
      util.getAnalyticsManager().sendEvent({
        eventCategory: 'bulbs-dfp-element Metrics',
        eventAction: 'enterviewport',
        eventLabel: this.dataset.adUnit,
      });
      this.adsManager.refreshSlot(this);
    }
  }

  handleExitViewport () {
    if(!this.trackedExitViewport) {
      this.trackedExitViewport = true;
      util.getAnalyticsManager().sendEvent({
        eventCategory: 'bulbs-dfp-element Metrics',
        eventAction: 'exitviewport',
        eventLabel: this.dataset.adUnit,
      });
    }

    /* We are taking our time rolling out this change.
     *  1) we want to make sure the page-speed implications of putting
     *      bulbs-elements in the critical path for ad loading isn't too heavy
     *  2) we want to look at analytics to get some idea of how often this will
     *      happen.
     *
     * The eventual strategy will be:
    this.adsManager.unloadAds(this)
     */
  }

  handleSlotRenderEnded () {
    util.getAnalyticsManager().sendEvent({
      eventCategory: 'bulbs-dfp-element Metrics',
      eventAction: 'slotrenderended',
      eventLabel: this.dataset.adUnit,
    });
  }

  handleImpressionViewable () {
    util.getAnalyticsManager().sendEvent({
      eventCategory: 'bulbs-dfp-element Metrics',
      eventAction: 'impressionviewable',
      eventLabel: this.dataset.adUnit,
    });
  }

  handleSlotOnload () {
    util.getAnalyticsManager().sendEvent({
      eventCategory: 'bulbs-dfp-element Metrics',
      eventAction: 'slotonload',
      eventLabel: this.dataset.adUnit,
    });
  }

  handleInterval () {
    let browserVisibility = document.visibilityState;

    util.getAnalyticsManager().sendEvent({
      eventCategory: 'bulbs-dfp-element Live Metrics',
      eventAction: `30-second-refresh-candidate-${browserVisibility}`,
      eventLabel: this.dataset.adUnit,
    });

    if (this.isViewable) {
      util.getAnalyticsManager().sendEvent({
        eventCategory: 'bulbs-dfp-element Live Metrics',
        eventAction: `30-second-refresh-triggered-${browserVisibility}`,
        eventLabel: this.dataset.adUnit,
      });

      if (browserVisibility === 'visible') {
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
