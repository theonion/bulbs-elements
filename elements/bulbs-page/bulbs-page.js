import {
  InViewMonitor,
  LockScroll,
  onReadyOrNow,
  getAnalyticsManager,
  debouncePerFrame,
  prepGaWrapper,
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
        this.gaTrackerWrapper = prepGaWrapper(this.dataset.contentAnalyticsDimensions);
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
      'reading_list',
      'scroll_view',
      this.getAttribute('pushstate-url')
    );
  }

}

registerElement('bulbs-page', BulbsPage);
