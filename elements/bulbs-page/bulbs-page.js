import {
  InViewMonitor,
  LockScroll,
  onReadyOrNow,
  getAnalyticsManager,
  debouncePerFrame,
  prepGaEventTracker,
} from 'bulbs-elements/util';
import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import './bulbs-page.scss';

// if we scroll past multiple pages at once they will all trigger a
// 'pagestart' event. We only want to fire one. We use this debouncer
// to skip all but the last 'pagestart' handler
let pageStartDebouncer = debouncePerFrame();

export default class BulbsPage extends BulbsHTMLElement {
  attachedCallback () {
    this.requireAttribute('pushstate-url');
    InViewMonitor.add(this);
    onReadyOrNow(() => this.handleDocumentReady());
    this.addEventListener('pagestart', () => this.handlePageStart());
  }

  detachedCallback () {
    InViewMonitor.remove(this);
  }

  get dimensions () {
    let targeting = JSON.parse(
      this.dataset.contentAnalyticsDimensions
    );
    return {
      'dimension1': targeting.dimension1 || 'None',
      'dimension2': targeting.dimension2 || 'None',
      'dimension3': targeting.dimension3 || 'None',
      'dimension4': targeting.dimension4 || 'None',
      'dimension5': targeting.dimension5 || 'None',
      'dimension6': targeting.dimension6 || 'None',
      'dimension7': targeting.dimension7 || 'None',
      'dimension8': targeting.dimension8 || 'None',
      'dimension9': targeting.dimension9 || 'None',
      'dimension10': targeting.dimension10 || 'None',
      'dimension11': targeting.dimension11 || 'None',
      'dimension12': targeting.dimension12 || 'None',
      'dimension13': targeting.dimension13 || 'None',
    };
  }

  prepGaTracker () {
    return prepGaEventTracker(
      'pageview',
      window.GOOGLE_ANALYTICS_ID,
      this.dimensions
    );
  }

  handleDocumentReady () {
    let lockScrollOnLoad = this.hasAttribute('lock-scroll-on-load');
    let isCurrentPage = this.getAttribute('pushstate-url') === location.pathname;

    if (lockScrollOnLoad && isCurrentPage) {
      LockScroll.lockToElement(this);
    }
  }

  handlePageStart () {
    pageStartDebouncer(() => {
      if (!this.gaTrackerWrapper) {
        this.gaTrackerWrapper = this.prepGaTracker();
      }

      history.replaceState(
        {},
        this.getAttribute('pushstate-title'),
        this.getAttribute('pushstate-url')
      );

      getAnalyticsManager().trackPageView(
        this.getAttribute('pushstate-url'),
        this.getAttribute('pushstate-title'),
        this.gaTrackerWrapper
      );
      this.sendAnalyticsEvent();
    });
  }

  sendAnalyticsEvent () {
    this.gaTrackerWrapper(
      'send', 'event',
      'multi_entry',
      'scroll_view',
      this.getAttribute('pushstate-url')
    )
  }

}

registerElement('bulbs-page', BulbsPage);
