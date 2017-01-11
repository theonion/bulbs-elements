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

export default class BulbsPage extends BulbsHTMLElement {
  connectedCallback () {
    this.requireAttribute('pushstate-url');
    InViewMonitor.add(this);
    onReadyOrNow(() => this.handleDocumentReady());
    this.addEventListener('pagestart', () => this.handlePageStart());
  }

  disconnectedCallback () {
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
    history.replaceState(
      {},
      this.getAttribute('pushstate-title'),
      this.getAttribute('pushstate-url')
    );

    getAnalyticsManager().trackPageView(
      this.getAttribute('pushstate-url'),
      this.getAttribute('pushstate-title')
    );
  }
}

registerElement('bulbs-page', BulbsPage);
