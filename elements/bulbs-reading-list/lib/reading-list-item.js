import { isUndefined, isNumber } from 'lodash';
import invariant from 'invariant';

export default class ReadingListItem {
  constructor (element, position) {
    invariant(element, 'ReadingListItem(element, position): element is undefined');
    invariant(element.id, 'ReadingListItem(element, position): element has no id');
    invariant(element.dataset.href, 'ReadingListItem(element, position): element has no data-href');
    invariant(element.dataset.title, 'ReadingListItem(element, position): element has no data-title');
    let elementMessage = 'ReadingListItem(element, position): element must be a bulbs-reading-list-item or have a reading-list-item class'; // eslint-disable-line max-len
    invariant(this.elementIsReadingListItem(element), elementMessage);
    invariant(!isUndefined(position), 'ReadingListItem(element, position): position is undefined');
    invariant(isNumber(position), 'ReadingListItem(element, position): position is not a number');
    this.element = element;
    this.href = element.dataset.href;
    this.id = element.id;
    this.title = element.dataset.title;
  }

  elementIsReadingListItem (element) {
    invariant(element, 'ReadingListItem.elementIsReadingListItem(element, position): element is undefined');
    let tagName = element.tagName.toLowerCase();
    return tagName === 'bulbs-reading-list-item' || element.classList.contains('reading-list-item');
  }
}
