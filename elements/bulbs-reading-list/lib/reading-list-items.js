import { map } from 'lodash';
import ReadingListItem from 'reading-list-item';
import invariant from 'invariant';

export default class ReadingListItems {
  constructor (element) {
    invariant(element, 'ReadingListItems(element): element is undefined');
    this.readingListItemElements = map(element.getElementsByTagName('bulbs-reading-list-item'));
    this.readingListItems = map(this.readingListItemElements, (el, i) => new ReadingListItem(el, i));
  }
}
