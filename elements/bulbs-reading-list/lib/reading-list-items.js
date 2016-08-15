/* eslint max-len: 0 */
import {
  find,
  isUndefined,
  map,
  maxBy,
  minBy,
} from 'lodash';
import ReadingListItem from 'reading-list-item';
import invariant from 'invariant';

export default class ReadingListItems {
  constructor (element) {
    invariant(element, 'ReadingListItems(element): element is undefined');
    this.element = element;
    this.readingListItemElements = map(element.getElementsByTagName('bulbs-reading-list-item'));
    this.createReadingListItems(this.readingListItemElements);
    this.currentItem = this.firstItem();
  }

  createReadingListItems (itemElements) {
    this.readingListItems = map(itemElements, (el, i) => new ReadingListItem(el, i));
  }

  firstItem () {
    return minBy(this.readingListItems, 'index');
  }

  lastItem () {
    return maxBy(this.readingListItems, 'index');
  }

  itemAtIndex (index) {
    invariant(!isUndefined(index), 'ReadingListItems.itemAtIndex(index): index is undefined');
    return find(this.readingListItems, (item) => item.index === index);
  }

  getListItemById (id) {
    invariant(id, 'ReadingListItems.getListItemById(id): id is undefined');
    return find(this.readingListItems, (item) => item.id === id);
  }

  setCurrentItemByIndex (index) {
    invariant(!isUndefined(index), 'ReadingListItems.setCurrentItemByIndex(index): index is undefined');
    let item = this.setCurrentItemByAttribute('index', index);
    invariant(item, `ReadingListItems.setCurrentItemByIndex(index): no item with the index value of ${index}`);
  }

  setCurrentItemById (id) {
    invariant(id, 'ReadingListItems.setCurrentItemById(id): id is undefined');
    let item = this.setCurrentItemByAttribute('id', id);
    invariant(item, `ReadingListItems.setCurrentItemById(id): no item with the id value of "${id}"`);
  }

  setCurrentItemByAttribute (attribute, value) {
    invariant(attribute, 'ReadingListItems.setCurrentItemByAttribute(attribute, value): attribute is undefined');
    invariant(!isUndefined(value), 'ReadingListItems.setCurrentItemByAttribute(attribute, value): value is undefined');
    let listItem = find(this.readingListItems, (item) => item[attribute] === value);
    if (listItem) {
      this.readingListItems.forEach((li) => {
        (li === listItem) ? li.setAsCurrent() : li.setAsNotCurrent();
      });
      this.currentItem = listItem;
    }
    return listItem;
  }

  isNextItem (listItem) {
    invariant(listItem, 'ReadingListItems.isNextItem(listItem): listItem is undefined');
    let nextItem = this.itemAtIndex(this.currentItem.index + 1);
    return nextItem ? (listItem.index === nextItem.index) : false;
  }

  isBeforeCurrentItem (listItem) {
    invariant(listItem, 'BulbsReadingList.isBeforeCurrentItem(listItem): listItem is undefined');
    return listItem.index < this.currentItem.index;
  }

  nextItem () {
    return this.itemAtIndex(this.currentItem.index + 1);
  }

  isAtTheEnd () {
    return this.currentItem === this.lastItem();
  }

  hasMoreItems () {
    return !this.isAtTheEnd();
  }
}
