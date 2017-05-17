import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import invariant from 'invariant';
import {
  debouncePerFrame,
  filterBadResponse,
  getResponseText,
  getAnalyticsManager,
  InViewMonitor,
  prepGaEventTracker,
} from 'bulbs-elements/util';

let pageStartDebouncer = debouncePerFrame();

class BulbsReadingListItem extends BulbsHTMLElement {
  attachedCallback () {
    const markdownText = '<bulbs-reading-list-item> requires attribute: ';
    invariant(this.dataset.id, markdownText + 'data-id');
    invariant(this.dataset.href, markdownText + 'data-href');
    invariant(this.dataset.partialUrl, markdownText + 'data-partial-url');
    invariant(this.dataset.title, markdownText + 'data-title');
    invariant(this.dataset.contentAnalyticsDimensions,
      markdownText + 'data-content-analytics-dimensions');
    invariant(window.GOOGLE_ANALYTICS_ID,
      '<bulbs-reading-list-item> requires GOOGLE_ANALYTICS_ID set on the window');

    InViewMonitor.add(this);
    this.id = parseInt(this.dataset.id, 10);
    this.href = this.dataset.href;
    this.partialUrl = this.dataset.partialUrl;
    this.title = this.dataset.title;
    this.gaDimensions = this.getGaDimensions();
    this.isLoaded = this.hasAttribute('data-is-loaded');
    this.fetchPending = false;
    this.loadingTemplate = '<p><i class="fa fa-spinner fa-spin"></i> Loading...</p>';
    this.pageStartThreshold = 200; // Pixels from top of viewport before considered to be on different adjacent page
    this.loadOnInitialization();

    this.registerEvents();
  }

  loadOnInitialization () {
    if(!this.isLoaded && InViewMonitor.isElementInViewport(this)) {
      this.loadContent();
    }
  }

  registerEvents () {
    this.addEventListener('approachingviewport', this.loadContent.bind(this));
    this.addEventListener('inviewrect', this.handlePageStart.bind(this));
  }

  getGaDimensions () {
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
      this.gaDimensions,
    );
  }

  sendAnalyticsEvent () {
    this.gaTrackerWrapper(
      'send', 'event',
      'reading_list',
      'scroll_view',
      this.href,
    );
  }

  loadContent () {
    return new Promise((resolve, reject) => {
      if (this.shouldLoad()) {
        this.fetchPending = true;
        this.fillContent(this.loadingTemplate);
        fetch(this.partialUrl, {
          credentials: 'same-origin',
        })
          .then(filterBadResponse)
          .then(getResponseText)
          .then((response) => {
            this.handleLoadContentComplete(response);
            resolve(this);
          })
          .catch((response) => {
            this.handleLoadContentError(response);
            reject(this);
          });
      }
    });
  }

  shouldLoad () {
    return !(this.isLoaded || this.fetchPending);
  }

  fillContent (content) {
    this.innerHTML = content;
    this.dataset.loadStatus = 'loading';
  }

  handleLoadContentComplete (content) {
    this.fillContent(content);
    this.isLoaded = true;
    this.fetchPending = false;
    this.dataset.loadStatus = 'loaded';
    // if ($('blockquote.twitter-tweet')) {
    //   twttr.widgets.load();
    // }
    if (window.twttr) {
      twttr.widgets.load();
    };
  }

  handleLoadContentError (response) {
    this.fetchPending = false;
    return new Promise((resolve, reject) =>
      reject(`<bulbs-reading-list-item> loadContent(): fetch failed "${response.status} ${response.statusText}"`));
  }

  isArticleBoundaryInView (event) {
    let articleTopNearViewportTop = event.detail.boundingRect.top <= this.pageStartThreshold && event.detail.boundingRect.top > 0;
    let articleBottomNearViewportTop = event.detail.boundingRect.bottom >= this.pageStartThreshold && event.detail.boundingRect.top < 0;

    return articleTopNearViewportTop || articleBottomNearViewportTop;
  }

  handlePageStart () {
    if ((window.location.pathname === this.href) || !this.isArticleBoundaryInView(event)) {
      return;
    }

    pageStartDebouncer(() => {
      if(!this.gaTrackerWrapper) {
        this.gaTrackerWrapper = this.prepGaTracker();
      }

      history.replaceState(
        {},
        this.title,
        this.href,
      );

      getAnalyticsManager().trackPageView(
        this.href,
        this.title,
        this.gaTrackerWrapper,
      );
      this.sendAnalyticsEvent();
    });
  }
}

registerElement('bulbs-reading-list-item', BulbsReadingListItem);

export default BulbsReadingListItem;
