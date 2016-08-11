/* eslint max-len: 0 */
import {
  find,
  isUndefined,
  map,
  minBy,
} from 'lodash';
import ReadingListItem from 'reading-list-item';
import invariant from 'invariant';

export default class ReadingListItems {
  constructor (element) {
    invariant(element, 'ReadingListItems(element): element is undefined');
    this.element = element;
    this.readingListItemElements = map(element.getElementsByTagName('bulbs-reading-list-item'));
    this.readingListItems = map(this.readingListItemElements, (el, i) => new ReadingListItem(el, i));
    this.currentListItem = minBy(this.readingListItems, 'position');
  }

  listItemAtPosition (position) {
    invariant(!isUndefined(position), 'ReadingListItems.listItemAtPosition(position): position is undefined');
    return find(this.readingListItems, (item) => item.position === position);
  }

  getListItemById (id) {
    invariant(id, 'ReadingListItems.getListItemById(id): id is undefined');
    return find(this.readingListItems, (item) => item.id === id);
  }

  setCurrentListItemByPosition (position) {
    invariant(!isUndefined(position), 'ReadingListItems.setCurrentListItemByPosition(position): position is undefined');
    let item = this.setCurrentListItemByAttribute('position', position);
    invariant(item, `ReadingListItems.setCurrentListItemByPosition(position): no item with the position value of ${position}`);
  }

  setCurrentListItemById (id) {
    invariant(id, 'ReadingListItems.setCurrentListItemById(id): id is undefined');
    let item = this.setCurrentListItemByAttribute('id', id);
    invariant(item, `ReadingListItems.setCurrentListItemById(id): no item with the id value of "${id}"`);
  }

  setCurrentListItemByAttribute (attribute, value) {
    invariant(attribute, 'ReadingListItems.setCurrentListItemByAttribute(attribute, value): attribute is undefined');
    invariant(!isUndefined(value), 'ReadingListItems.setCurrentListItemByAttribute(attribute, value): value is undefined');
    let listItem = find(this.readingListItems, (item) => item[attribute] === value);
    if (listItem) {
      this.readingListItems.forEach((li) => {
        (li === listItem) ? li.setAsCurrent() : li.setAsNotCurrent();
      });
      this.currentListItem = listItem;
    }
    return listItem;
  }

  isNextListItem (listItem) {
    invariant(listItem, 'ReadingListItems.isNextListItem(listItem): listItem is undefined');
    let nextItem = this.listItemAtPosition(this.currentListItem.position + 1);
    return nextItem ? (listItem.position === nextItem.position) : false;
  }

  isBeforeCurrentItem (listItem) {
    invariant(listItem, 'BulbsReadingList.isBeforeCurrentItem(listItem): listItem is undefined');
    return listItem.position < this.currentListItem.position;
  }
}
