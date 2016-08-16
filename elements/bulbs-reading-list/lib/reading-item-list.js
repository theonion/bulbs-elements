/* eslint max-len: 0 */
import {
  find,
  isUndefined,
  map,
  maxBy,
  minBy,
  some,
} from 'lodash';
import ReadingListItem from 'reading-list-item';
import invariant from 'invariant';

export default class ReadingItemList {
  constructor (menu, articles) {
    invariant(menu, 'ReadingItemList(menu, articles): menu is undefined');
    invariant(articles, 'ReadingItemList(menu, articles): articles is undefined');
    let elementPairs = this.getReadingListElementPairs(menu, articles);
    this.readingListItems = map(elementPairs, (elements, i) => {
      return new ReadingListItem(elements.menuItem, elements.article, i);
    });
    this.currentItem = this.firstItem();
  }

  getReadingListElementPairs (menu, articles) {
    return map(menu.children, this.getArticleElementForMenuItemElement(articles.children));
  }

  getArticleElementForMenuItemElement (articles) {
    return function (menuItemElement) {
      let articleElement = find(articles, (article) => article.dataset.id === menuItemElement.dataset.id);
      invariant(articleElement, `ReadingItemList.getArticleElementForMenuItemElement(articles): menu item with id ${menuItemElement.dataset.id} has no corresponding article`); // eslint-disable-line max-len
      return {
        menuItem: menuItemElement,
        article: articleElement,
      };
    };
  }

  firstItem () {
    return minBy(this.readingListItems, 'index');
  }

  lastItem () {
    return maxBy(this.readingListItems, 'index');
  }

  itemAtIndex (index) {
    invariant(!isUndefined(index), 'ReadingItemList.itemAtIndex(index): index is undefined');
    return find(this.readingListItems, (item) => item.index === index);
  }

  getListItemById (id) {
    invariant(id, 'ReadingItemList.getListItemById(id): id is undefined');
    return find(this.readingListItems, (item) => item.id === id);
  }

  setCurrentItemByIndex (index) {
    invariant(!isUndefined(index), 'ReadingItemList.setCurrentItemByIndex(index): index is undefined');
    let item = this.setCurrentItemByAttribute('index', index);
    invariant(item, `ReadingItemList.setCurrentItemByIndex(index): no item with the index value of ${index}`);
  }

  setCurrentItemById (id) {
    invariant(id, 'ReadingItemList.setCurrentItemById(id): id is undefined');
    let item = this.setCurrentItemByAttribute('id', id);
    invariant(item, `ReadingItemList.setCurrentItemById(id): no item with the id value of "${id}"`);
  }

  setCurrentItemByAttribute (attribute, value) {
    invariant(attribute, 'ReadingItemList.setCurrentItemByAttribute(attribute, value): attribute is undefined');
    invariant(!isUndefined(value), 'ReadingItemList.setCurrentItemByAttribute(attribute, value): value is undefined');
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
    invariant(listItem, 'ReadingItemList.isNextItem(listItem): listItem is undefined');
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

  hasPendingFetch () {
    return some(this.readingListItems, (item) => item.fetchPending);
  }
}
