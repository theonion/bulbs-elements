import {
  InViewMonitor,
  getAnalyticsManager,
} from 'bulbs-elements/util';
import invariant from 'invariant';
import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import './bulbs-dfp.scss';

// We have to do this little dance to properly subclass elements in Safari
function BulbsHTMLDivElement () {}
BulbsHTMLDivElement.prototype = HTMLDivElement.prototype;

export default class BulbsDfp extends BulbsHTMLElement {
  attachedCallback () {
    invariant(this.hasAttribute('refresh-interval'),
        '<div is="bulbs-dfp>" MUST specify a refresh-timeout attribute in ms');

    invariant(this.hasAttribute('viewport-threshold'),
        '<div is="bulbs-dfp"> MUST specify a `viewport-threshold` property. ' +
        'This value defines how many screens away from the viewport the slot ' +
        'will be in order to trigger an ad load. 1.2 = 120% viewport height.');

    this.handleEnterViewport = this.handleEnterViewport.bind(this);
    this.handleExitViewport = this.handleExitViewport.bind(this);
    this.handleInterval = this.handleInterval.bind(this);

    this.addEventListener('enterviewport', this.handleEnterViewport);
    this.addEventListener('enterviewport', this.handleExitViewport);

    let threshold = parseFloat(this.getAttribute('viewport-threshold'), 10);
    InViewMonitor.add(this, {
      get distanceFromBottom () {
        return window.innerHeight * threshold;
      },
      get distanceFromTop () {
        return window.innerHeight * threshold;
      },
    });

    let intervalLength = parseFloat(this.getAttribute('refresh-interval', 10));
    this.interval = setInterval(this.handleInterval, intervalLength);
  }

  detachedCallback () {
    InViewMonitor.remove(this);
    clearInterval(this.interval);
  }

  handleEnterViewport () {
    getAnalyticsManager().sendEvent({
      eventCategory: 'AdTech Metrics',
      eventAction: 'enterviewport',
      eventLabel: this.dataset.adUnit,
    });
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
    getAnalyticsManager().sendEvent({
      eventCategory: 'AdTech Metrics',
      eventAction: 'exitviewport',
      eventLabel: this.dataset.adUnit,
    });

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
    getAnalyticsManager().sendEvent({
      eventCategory: 'AdTech Metrics',
      eventAction: '30-second-refresh-candidate',
      eventLabel: this.dataset.adUnit,
    });

    if (this.isViewable) {
      getAnalyticsManager().sendEvent({
        eventCategory: 'AdTech Metrics',
        eventAction: '30-second-refresh',
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
    return InViewMonitor.isElementInViewport(this, {
      distanceFromTop: this.offsetHeight,
      distanceFromBottom: -this.offsetHeight,
    });
  }

  get adsManager () {
    const adsManager = window.BULBS_ELEMENTS_ADS_MANAGER;
    if (!(adsManager && adsManager.loadAds === 'function')) {
      console.warn(
        '<div is="bulbs-dfp"> will not trigger since ' +
        '`window.BULBS_ELEMENTS_ADS_MANAGER` is not configured to an ' +
        'AdsManager instance.'
      );
    }

    return adsManager;
  }
}

registerElement('bulbs-dfp', BulbsDfp);
