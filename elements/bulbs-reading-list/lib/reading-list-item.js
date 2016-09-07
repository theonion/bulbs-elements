import { isUndefined, isNumber } from 'lodash';
import invariant from 'invariant';
import { filterBadResponse, getResponseText } from 'bulbs-elements/util';

export default class ReadingListItem {
  constructor (menuElement, articleElement, index) {
    invariant(menuElement, 'ReadingListItem(menuElement, articleElement, index): menuElement is undefined');
    invariant(menuElement.dataset.id, 'ReadingListItem(menuElement, articleElement, index): menuElement has no data-id');
    invariant(menuElement.dataset.href, 'ReadingListItem(menuElement, articleElement, index): menuElement has no data-href');
    invariant(menuElement.dataset.title, 'ReadingListItem(menuElement, articleElement, index): menuElement has no data-title');
    invariant(menuElement.dataset.partialUrl, 'ReadingListItem(menuElement, articleElement, index): menuElement has no data-partial-url');
    invariant(this.elementIsReadingListItem(menuElement), 'ReadingListItem(menuElement, articleElement, index): menuElement must be a bulbs-reading-list-item or have a reading-list-item class');
    invariant(!isUndefined(index), 'ReadingListItem(menuElement, articleElement, index): index is undefined');
    invariant(isNumber(index), 'ReadingListItem(menuElement, articleElement, index): index is not a number');

    this.menuElement = menuElement;
    this.articleElement = articleElement;
    this.href = menuElement.dataset.href;
    this.partialUrl = menuElement.dataset.partialUrl;
    this.id = menuElement.dataset.id;
    this.index = index;
    this.title = menuElement.dataset.title;
    this.loadDistanceThreshold = 100;
    this.fetchPending = false;
    this.loadingTemplate = '<p class="reading-list-article-loading">Loading...</p>';
    this.isCurrent = false;
  }

  isLoaded () {
    return !!this.articleElement.children.length;
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
    if (this.shouldLoad()) {
      this.fillContent(this.loadingTemplate);
      return fetch(this.partialUrl)
        .then(filterBadResponse)
        .then(getResponseText)
        .then(this.handleLoadContentComplete.bind(this))
        .catch(this.handleLoadContentError);
    }

    return new Promise((resolve, reject) => reject('Article should not load'));
  }

  shouldLoad () {
    return !(this.isLoaded() || this.fetchPending);
  }

  handleLoadContentComplete (content) {
    this.fillContent(content);
    return new Promise((resolve) => resolve(this));
  }

  handleLoadContentError (response) {
    return new Promise((resolve, reject) => reject(`ReadingListItem.loadContent(): fetch failed "${response.status} ${response.statusText}"`));
  }

  fillContent (content) {
    this.articleElement.innerHTML = content;
  }

  isWithinViewThreshold (scrollPosition = 0) {
    let difference = this.articleElement.offsetTop - scrollPosition;
    return difference <= this.loadDistanceThreshold;
  }

  scrollIntoView () {
    this.articleElement.scrollIntoView();
  }
}
