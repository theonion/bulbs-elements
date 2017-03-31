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
import invariant from 'invariant';

import './bulbs-page.scss';

let inViewRectDebouncer = debouncePerFrame();
let inViewQueue = [];

function drainInViewQueue () {
  // If there are multiple pages in view, this will choose the one that takes
  //  up the most screen realestate.
  const pageInFocus = inViewQueue.reduce((currentPage, page) => {
    if (!currentPage ||
        page.elementRatioOfWindow() > currentPage.elementRatioOfWindow()) {
      return page;
    }

    return currentPage;
  });

  if (pageInFocus) {
    pageInFocus.handleInViewAndInFocus();
  }

  inViewQueue = [];
}

export default class BulbsPage extends BulbsHTMLElement {
  attachedCallback () {
    const markdownText = '<bulbs-page> requires attribute: ';

    invariant(
      this.dataset.contentAnalyticsDimensions,
      markdownText + 'data-content-analytics-dimensions'
    );

    this.requireAttribute('pushstate-url');
    InViewMonitor.add(this);
    onReadyOrNow(() => this.handleDocumentReady());
    this.addEventListener('inviewrect', this.handleInView.bind(this));
  }

  detachedCallback () {
    InViewMonitor.remove(this);
  }

  get dimensions () {
    let targeting = JSON.parse(
      this.dataset.contentAnalyticsDimensions || '{}'
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

  isCurrentPage () {
    // NOTE : this needs to be a function so that it can be mocked in tests,
    //    otherwise changing pathname and hash for testing will interfere
    //    with other test suites.
    return this.getAttribute('pushstate-url') === location.pathname + location.hash;
  }

  handleDocumentReady () {
    let lockScrollOnLoad = this.hasAttribute('lock-scroll-on-load');

    if (lockScrollOnLoad && this.isCurrentPage()) {
      LockScroll.lockToElement(this);
    }
  }

  elementRatioOfWindow () {
    if (!this.cachedViewRect) {
      return;
    }

    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const isOverTop = this.cachedViewRect.top < 0;
    const isUnderBottom = this.cachedViewRect.bottom > windowHeight;

    if (isOverTop) {
      return this.cachedViewRect.bottom / windowHeight;
    } else if (isUnderBottom) {
      return (windowHeight - this.cachedViewRect.top) / windowHeight;
    }

    return this.cachedViewRect.height / windowHeight;
  }

  handleInView (event) {
    this.cachedViewRect = event.detail.boundingRect;
    inViewQueue.push(this);
    inViewRectDebouncer(drainInViewQueue);
  }

  handleInViewAndInFocus () {
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
  }

  sendAnalyticsEvent () {
    this.gaTrackerWrapper(
      'send', 'event',
      'reading_list',
      'scroll_view',
      this.getAttribute('pushstate-url')
    );
  }

}

registerElement('bulbs-page', BulbsPage);
