import { isUndefined, isNumber } from 'lodash';
import scrollIntoView from 'scroll-into-view';
import invariant from 'invariant';
import {
  filterBadResponse,
  getResponseText,
  getScrollOffset,
  getWindowDimensions,
} from 'bulbs-elements/util';

export default class ReadingListItem {
  constructor (menuElement, articleElement, index) {
    invariant(menuElement, 'ReadingListItem(menuElement, articleElement, index): menuElement is undefined');
    invariant(articleElement, 'ReadingListItem(menuElement, articleElement, index): articleElement is undefined');
    invariant(!isUndefined(index), 'ReadingListItem(menuElement, articleElement, index): index is undefined');
    invariant(isNumber(index), 'ReadingListItem(menuElement, articleElement, index): index is not a number');
    invariant(menuElement.dataset.id, 'ReadingListItem(menuElement, articleElement, index): menuElement has no data-id');
    invariant(menuElement.dataset.href, 'ReadingListItem(menuElement, articleElement, index): menuElement has no data-href');
    invariant(menuElement.dataset.title, 'ReadingListItem(menuElement, articleElement, index): menuElement has no data-title');
    invariant(menuElement.dataset.partialUrl, 'ReadingListItem(menuElement, articleElement, index): menuElement has no data-partial-url');
    invariant(this.elementIsReadingListItem(menuElement), 'ReadingListItem(menuElement, articleElement, index): menuElement must be a bulbs-reading-list-item or have a reading-list-item class');

    this.menuElement = menuElement;
    this.articleElement = articleElement;
    this.href = menuElement.dataset.href;
    this.partialUrl = menuElement.dataset.partialUrl;
    this.progressBar = menuElement.getElementsByTagName('progress-bar')[0];
    this.progress = 0;
    this.id = menuElement.dataset.id;
    this.index = index;
    this.title = menuElement.dataset.title;
    this.loadDistanceThreshold = 200;
    this.readDistanceOffset = 250;
    this.isLoaded = false;
    this.fetchPending = false;
    this.loadingTemplate = '<p class="reading-list-article-loading">Loading...</p>';
    this.isCurrent = false;
  }

  elementIsReadingListItem (element) {
    invariant(element, 'ReadingListItem.elementIsReadingListItem(element): element is undefined');
    let tagName = element.tagName.toLowerCase();
    return tagName === 'bulbs-reading-list-item' || element.classList.contains('reading-list-item');
  }

  setAsCurrent () {
    this.menuElement.classList.add('current');
    this.articleElement.classList.add('current');
    this.isCurrent = true;
  }

  setAsNotCurrent () {
    this.menuElement.classList.remove('current');
    this.articleElement.classList.remove('current');
    this.isCurrent = false;
  }

  loadContent () {
    return new Promise((resolve, reject) => {
      if (this.shouldLoad()) {
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

  handleLoadContentComplete (content) {
    this.fillContent(content);
    this.isLoaded = true;
  }

  handleLoadContentError (response) {
    return new Promise((resolve, reject) => reject(`ReadingListItem.loadContent(): fetch failed "${response.status} ${response.statusText}"`));
  }

  fillContent (content) {
    this.articleElement.innerHTML = content;
  }

  isWithinViewThreshold (scrollPosition = 0) {
    let difference = this.articleElement.getBoundingClientRect().top - this.loadDistanceThreshold;

    return difference <= scrollPosition;
  }

  isNearlyInView () {
    let { bottom } = this.articleElement.getBoundingClientRect();
    let distance = getWindowDimensions().height + this.loadDistanceThreshold;

    return bottom < distance;
  }

  scrollIntoView () {
    scrollIntoView(this.articleElement, {
      align: {
        top: 1,
        left: 0,
      },
    });
  }

  calculateProgress (scrollPosition, articleDimensions) {
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
    return Math.abs(Math.floor(percentage));
  }

  setProgress (progress) {
    this.progress = progress;
    this.progressBar.setAttribute('progress', this.progress);
  }

  updateProgress () {
    let articleDimensions = this.articleElement.getBoundingClientRect();
    let scrollPosition = getScrollOffset();
    let calculatedProgress = this.calculateProgress(scrollPosition, articleDimensions);
    let progress = calculatedProgress > 100 ? 100 : calculatedProgress;

    this.setProgress(progress);
  }
}
