import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import invariant from 'invariant';
import {
  debouncePerFrame,
  filterBadResponse,
  getResponseText,
  InViewMonitor,
} from 'bulbs-elements/util';

let pageStartDebouncer = debouncePerFrame();

class BulbsReadingListItem extends BulbsHTMLElement {
  attachedCallback () {
    const markdownText = '<bulbs-reading-list-item> requires attribute: ';
    invariant(this.dataset.id, markdownText + 'data-id');
    invariant(this.dataset.href, markdownText + 'data-href');
    invariant(this.dataset.partialUrl, markdownText + 'data-partial-url');
    invariant(this.dataset.title, markdownText  + 'data-title');
    invariant(this.dataset.contentAnalyticsDimensions,
      markdownText  + 'data-content-analytics-dimensions');

    InViewMonitor.add(this);
    this.id = parseInt(this.dataset.id, 10);
    this.href = this.dataset.href;
    this.partialUrl = this.dataset.partialUrl;
    this.title = this.dataset.title;
    this.gaDimensions = this.getGaDimensions();

    this.isLoaded = false;
    this.fetchPending = false;
    this.loadingTemplate = '<p><i class="fa fa-spinner fa-spin"></i> Loading...</p>';

    this.registerEvents();
  }

  registerEvents () {
    this.addEventListener('approachingviewport', this.loadContent.bind(this));
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
    };
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
  }

  handleLoadContentError (response) {
    this.fetchPending = false;
    return new Promise((resolve, reject) => reject(`ReadingListArticle.loadContent(): fetch failed "${response.status} ${response.statusText}"`));
  }
}

registerElement('bulbs-reading-list-item', BulbsReadingListItem);

export default BulbsReadingListItem;
