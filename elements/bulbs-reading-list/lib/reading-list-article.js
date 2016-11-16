import invariant from 'invariant';
import { isUndefined } from 'lodash';
import scrollIntoView from 'scroll-into-view';
import {
  filterBadResponse,
  getResponseText,
  getWindowDimensions,
  getAnalyticsManager,
} from 'bulbs-elements/util';

export default class ReadingListArticle {
  constructor (element, dispatcher, index) {
    invariant(element, 'new ReadingListArticle(element, dispatcher, index): element is undefined');
    invariant(dispatcher, 'new ReadingListArticle(element, dispatcher, index): dispatcher is undefined');
    invariant(!isUndefined(index), 'new ReadingListArticle(element, dispatcher, index): index is undefined');

    this.element = element;
    this.dispatcher = dispatcher;
    this.index = index;
    this.progress = 0;
    this.id = parseInt(element.dataset.id, 10);
    this.href = element.dataset.href;
    this.partialUrl = element.dataset.partialUrl;
    this.title = element.dataset.title;
    this.loadDistanceThreshold = 400;
    this.readDistanceOffset = 250;
    this.isLoaded = false;
    this.loadingTemplate = '<p class="reading-list-article-loading">Loading...</p>';
    this.fetchPending = false;
    this.registerEvents();
  }

  registerEvents () {
    this.dispatcher.on('scroll-down', this.handleScrollDown.bind(this));
    this.dispatcher.on('scroll', this.handleScroll.bind(this));
  }

  scrollIntoView () {
    scrollIntoView(this.element, {
      align: {
        top: 1,
        left: 0,
      },
    });
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
    this.element.innerHTML = content;
  }

  handleLoadContentComplete (content) {
    this.fillContent(content);
    this.isLoaded = true;
    this.fetchPending = false;
  }

  handleLoadContentError (response) {
    this.fetchPending = false;
    return new Promise((resolve, reject) => reject(`ReadingListArticle.loadContent(): fetch failed "${response.status} ${response.statusText}"`));
  }

  handleScrollDown () {
    if (!this.isLoaded && this.isNearlyInView()) {
      this.loadContent();
    }
  }

  handleScroll (offset) {
    const newProgress = this.calculateProgress(offset);
    this.pushStateIfStartedReading(this.progress, newProgress);
    this.progress = newProgress;
    this.dispatcher.emit('reading-list-item-progress-update', this);
  }

  calculateProgress () {
    let articleDimensions = this.element.getBoundingClientRect();
    let percentage = 0;
    let start = 0;
    let height = Math.abs(Math.floor(articleDimensions.height)) - this.readDistanceOffset;

    let top = articleDimensions.top;

    if (articleDimensions.top <= start && height > 0) {
      let position = top;
      if (position < 0) {
        position = position * -1;
      }
      percentage = position / height * 100;
    }
    const progress = Math.abs(Math.floor(percentage));

    return progress > 100 ? 100 : progress;
  }

  pushStateIfStartedReading (oldProgress, newProgress) {
    if (this.startedReading(oldProgress, newProgress)) {
      this.pushToHistory();
      getAnalyticsManager().trackPageView(
        this.href,
        this.title
      );
    }
  }

  startedReading (oldProgress, newProgress) {
    return (oldProgress === 0 && newProgress > 0) || (oldProgress === 100 && newProgress < 100)
  }

  pushToHistory () {
    window.history.replaceState(null, this.title, this.href);
  }

  isNearlyInView () {
    let { bottom } = this.element.getBoundingClientRect();
    let distance = getWindowDimensions().height + this.loadDistanceThreshold;

    return bottom < distance;
  }
}
