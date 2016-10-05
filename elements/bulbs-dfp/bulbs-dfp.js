import util from 'bulbs-elements/util';
import invariant from 'invariant';
import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';

export default class BulbsDfp extends BulbsHTMLElement {
  attachedCallback () {
    invariant(this.hasAttribute('refresh-interval'),
        '<div is="bulbs-dfp>" MUST specify a `refresh-interval` attribute in ms');

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

    this.addEventListener('enterviewport', this.handleEnterViewport);
    this.addEventListener('exitviewport', this.handleExitViewport);

    let threshold = parseFloat(this.getAttribute('viewport-threshold'), 10);
    util.InViewMonitor.add(this, {
      get distanceFromTop () {
        return window.innerHeight * threshold;
      },
      get distanceFromBottom () {
        return -(window.innerHeight * threshold);
      },
    });

    let intervalLength = parseFloat(this.getAttribute('refresh-interval', 10));
    this.refreshInterval = window.setInterval(this.handleInterval, intervalLength);
  }

  detachedCallback () {
    util.InViewMonitor.remove(this);
    window.clearInterval(this.refreshInterval);
  }

  handleEnterViewport () {
    if(!this.trackedEnterViewport) {
      this.trackedEnterViewport = true;
      util.getAnalyticsManager().sendEvent({
        eventCategory: 'bulbs-dfp-element Metrics',
        eventAction: 'enterviewport',
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
    this.adsManager.loadAds(this)
     */
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

  handleInterval () {
    util.getAnalyticsManager().sendEvent({
      eventCategory: 'bulbs-dfp-element Metrics',
      eventAction: '30-second-refresh-candidate',
      eventLabel: this.dataset.adUnit,
    });

    if (this.isViewable) {
      util.getAnalyticsManager().sendEvent({
        eventCategory: 'bulbs-dfp-element Metrics',
        eventAction: '30-second-refresh-triggered',
        eventLabel: this.dataset.adUnit,
      });
      /* We are taking our time rolling out this change.
       *  1) we want to make sure the page-speed implications of putting
       *      bulbs-elements in the critical path for ad loading isn't too heavy
       *  2) we want to look at analytics to get some idea of how often this will
       *      happen.
       *
       * The eventual strategy will be:
      this.adsManager.reloadAds(this)
       */
    }
  }

  get isViewable () {
    return util.InViewMonitor.isElementInViewport(this, {
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
