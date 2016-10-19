import { InViewMonitor } from 'bulbs-elements/util';
import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import './bulbs-page-state.scss';

const USER_EVENTS = [
  'scroll', 'mousedown', 'wheel', 'DOMMouseScroll', 'mousewheel', 'keyup',
];

// FIXME: do this
// let prefixCount = 0;
export default class BulbsPageState extends BulbsHTMLElement {
  createdCallback () {
    this.handleUserEvent = this.handleUserEvent.bind(this);
  }

  attachedCallback () {
    this.requireAttribute('pushstate-url');
    InViewMonitor.add(this);

    if (document.readyState === 'complete') {
      this.handleDocumentReady();
    }
    else {
      window.addEventListener('DOMContentLoaded', () => this.handleDocumentReady());
    }

    USER_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, this.handleUserEvent);
    });

    // FIXME:
    // this.ga = makePrefixedGa(
    //   `bulbs-page-state-${prefixCount++}`,
    //   this.gaDimensions,
    // );
  }

  detachedCallback () {
    InViewMonitor.remove(this);
  }

  get shouldAnchorScroll () {
    let anchorOnLoad = this.hasAttribute('anchor-on-load');
    let isCurrentPage = this.getAttribute('pushstate-url') === location.pathname;
    return anchorOnLoad && isCurrentPage;
  }

  get gaDimensions () {
    if (this.hasAttribute('ga-dimensions')) {
      return JSON.parse(this.getAttribute('ga-dimensions'));
    }
    return {};
  }

  maybeAnchorElement () {
    if (this.userIntervened) {
      return;
    }
    else if (this.shouldAnchorScroll) {
      this.offsetParent.scrollTop = this.offsetTop;
      requestAnimationFrame(() => this.maybeAnchorElement());
    }
  }

  handleUserEvent ({ type }) {
    if(type === 'DOMMouseScroll'
       || type === 'mousewheel'
       || type === 'wheel'
       || type === 'mousedown'
       || type === 'keyup'
      ) {
      this.userIntervened = true;
      USER_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, this.handleUserEvent);
      });
    }
  }

  handleDocumentReady () {
    this.maybeAnchorElement();
    // Bind this event here to avoid triggering
    //   extra page views while scrolling to element
    this.addEventListener('pagestart', () => this.handlePageStart());
  }

  handlePageStart () {
    history.replaceState(
      {},
      this.getAttribute('pushstate-title'),
      this.getAttribute('pushstate-url')
    );

    // FIXME: do this
    // if (!this.trackedPageView) {
    //   if (this.hasAttribute('ga-dimensions') {
    //     this.trackedPageView = true;
    //     this.ga.send('event', 'pageview', this.getAttribute('pushstate-url');
    //   }
    // }
  }
}

registerElement('bulbs-page-state', BulbsPageState);
