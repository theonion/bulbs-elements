import { isUndefined, isNumber } from 'lodash';
import invariant from 'invariant';
import { filterBadResponse, getResponseText } from 'bulbs-elements/util';

export default class ReadingListItem {
  constructor (element, index) {
    invariant(element, 'ReadingListItem(element, index): element is undefined');
    invariant(element.id, 'ReadingListItem(element, index): element has no id');
    invariant(element.dataset.href, 'ReadingListItem(element, index): element has no data-href');
    invariant(element.dataset.title, 'ReadingListItem(element, index): element has no data-title');
    let elementMessage = 'ReadingListItem(element, index): element must be a bulbs-reading-list-item or have a reading-list-item class'; // eslint-disable-line max-len
    invariant(this.elementIsReadingListItem(element), elementMessage);
    invariant(!isUndefined(index), 'ReadingListItem(element, index): index is undefined');
    invariant(isNumber(index), 'ReadingListItem(element, index): index is not a number');

    this.element = element;
    this.href = element.dataset.href;
    this.id = element.id;
    this.index = index;
    this.title = element.dataset.title;
    this.loadDistanceThreshold = 100;
    this.loaded = false;
    this.fetchPending = false;
  }

  elementIsReadingListItem (element) {
    invariant(element, 'ReadingListItem.elementIsReadingListItem(element, index): element is undefined');
    let tagName = element.tagName.toLowerCase();
    return tagName === 'bulbs-reading-list-item' || element.classList.contains('reading-list-item');
  }

  isCurrent () {
    return this.element.classList.contains('current');
  }

  setAsCurrent () {
    this.element.classList.add('current');
  }

  setAsNotCurrent () {
    this.element.classList.remove('current');
  }

  loadContent () {
    if (this.shouldLoad()) {
      fetch(this.href)
        .then(filterBadResponse)
        .then(getResponseText)
        .then(this.handleLoadContentComplete.bind(this))
        .catch(this.handleLoadContentError);
    }
  }

  shouldLoad () {
    return !(this.loaded || this.fetchPending);
  }

  handleLoadContentComplete (content) {
    this.fillContent(content);
    this.loaded = true;
  }

  handleLoadContentError (response) {
    throw new Error(`ReadingListItem.loadContent(): fetch failed "${response.status} ${response.statusText}"`);
  }

  fillContent (content) {
    this.element.innerHTML = content;
    console.log(`content filled for article: ${this.title}`);
  }

  isWithinViewThreshold (scrollPosition = 0) {
    let difference = this.element.offsetTop - scrollPosition;
    return difference <= this.loadDistanceThreshold;
  }
}
