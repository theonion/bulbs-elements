/* eslint max-len: 0 */
import { isUndefined, isNumber } from 'lodash';
import invariant from 'invariant';
import { filterBadResponse, getResponseText } from 'bulbs-elements/util';

export default class ReadingListItem {
  constructor (menuElement, articleElement, index) {
    invariant(menuElement, 'ReadingListItem(menuElement, articleElement, index): menuElement is undefined');
    invariant(menuElement.dataset.id, 'ReadingListItem(menuElement, articleElement, index): menuElement has no data-id');
    invariant(menuElement.dataset.href, 'ReadingListItem(menuElement, articleElement, index): menuElement has no data-href');
    invariant(menuElement.dataset.title, 'ReadingListItem(menuElement, articleElement, index): menuElement has no data-title');
    invariant(this.elementIsReadingListItem(menuElement), 'ReadingListItem(menuElement, articleElement, index): menuElement must be a bulbs-reading-list-item or have a reading-list-item class');
    invariant(!isUndefined(index), 'ReadingListItem(menuElement, articleElement, index): index is undefined');
    invariant(isNumber(index), 'ReadingListItem(menuElement, articleElement, index): index is not a number');

    this.menuElement = menuElement;
    this.articleElement = articleElement;
    this.href = menuElement.dataset.href;
    this.id = menuElement.dataset.id;
    this.index = index;
    this.title = menuElement.dataset.title;
    this.loadDistanceThreshold = 100;
    this.loaded = false;
    this.fetchPending = false;
  }

  elementIsReadingListItem (element) {
    invariant(element, 'ReadingListItem.elementIsReadingListItem(element): element is undefined');
    let tagName = element.tagName.toLowerCase();
    return tagName === 'bulbs-reading-list-item' || element.classList.contains('reading-list-item');
  }

  isCurrent () {
    return this.menuElement.classList.contains('current');
  }

  setAsCurrent () {
    this.menuElement.classList.add('current');
  }

  setAsNotCurrent () {
    this.menuElement.classList.remove('current');
  }

  loadContent () {
    if (this.shouldLoad()) {
      return fetch(this.href)
        .then(filterBadResponse)
        .then(getResponseText)
        .then(this.handleLoadContentComplete.bind(this))
        .catch(this.handleLoadContentError);
    }

    return new Promise((resolve, reject) => reject('Article should not load'));
  }

  shouldLoad () {
    return !(this.loaded || this.fetchPending);
  }

  handleLoadContentComplete (content) {
    this.fillContent(content);
    this.loaded = true;
    return new Promise((resolve) => resolve(this));
  }

  handleLoadContentError (response) {
    return new Promise((resolve, reject) => reject(`ReadingListItem.loadContent(): fetch failed "${response.status} ${response.statusText}"`)); // eslint-disable-line max-len
  }

  fillContent (content) {
    this.articleElement.innerHTML = content;
    console.log(`content filled for article: ${this.title}`);
  }

  isWithinViewThreshold (scrollPosition = 0) {
    let difference = this.articleElement.offsetTop - scrollPosition;
    return difference <= this.loadDistanceThreshold;
  }
}
