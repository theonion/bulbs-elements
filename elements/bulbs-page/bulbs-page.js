import {
  InViewMonitor,
  LockScroll,
  onReadyOrNow,
} from 'bulbs-elements/util';
import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import './bulbs-page.scss';

export default class BulbsPage extends BulbsHTMLElement {
  attachedCallback () {
    this.requireAttribute('pushstate-url');
    InViewMonitor.add(this);
    onReadyOrNow(() => this.handleDocumentReady());
    this.addEventListener('pagestart', () => this.handlePageStart());

    // FIXME:
    // this.ga = makePrefixedGa('bulbs-page', this.gaDimensions);
  }

  detachedCallback () {
    InViewMonitor.remove(this);
  }

  // FIXME:
  //get gaDimensions () {
  //  if (this.hasAttribute('ga-dimensions')) {
  //    return JSON.parse(this.getAttribute('ga-dimensions'));
  //  }
  //  return {};
  //}

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

    // FIXME:
    // if (!this.hasTrackedPageView) {
    //   if (this.hasAttribute('ga-dimensions') {
    //     this.hasTrackedPageView = true;
    //     this.ga('send', 'event', 'pageview', this.getAttribute('pushstate-url');
    //   }
    // }
  }
}

registerElement('bulbs-page', BulbsPage);
