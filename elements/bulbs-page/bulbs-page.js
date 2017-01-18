import {
  InViewMonitor,
  LockScroll,
  onReadyOrNow,
  getAnalyticsManager,
} from 'bulbs-elements/util';
import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import './bulbs-page.scss';

// if we scroll past multiple pages at once they will all trigger a
// 'pagestart' event. We only want to fire one. We use this governer
// plate to skip all but the last 'pagestart' handler
let pageStartGoverner;

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
    // using request animation frame enforces only one
    // handlePagStart call will have an effect per frame.
    if (pageStartGoverner) {
      window.cancelAnimationFrame(pageStartGoverner);
    }

    pageStartGoverner = window.requestAnimationFrame(() => {
      history.replaceState(
        {},
        this.getAttribute('pushstate-title'),
        this.getAttribute('pushstate-url')
      );

      getAnalyticsManager().trackPageView(
        this.getAttribute('pushstate-url'),
        this.getAttribute('pushstate-title')
      );
      pageStartGoverner = null;
    });
  }
}

registerElement('bulbs-page', BulbsPage);
