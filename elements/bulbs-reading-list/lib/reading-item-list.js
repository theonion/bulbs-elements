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
    this.items = map(elementPairs, this.createReadingListItem);
    this.currentItem = this.firstItem();
    this.isFetchingNextArticle = false;
  }

  createReadingListItem (elements, index) {
    return new ReadingListItem(elements.menuItem, elements.article, index);
  }

  getReadingListElementPairs (menu, articles) {
    return map(menu.children, this.getArticleElementForMenuItemElement(articles.children));
  }

  findArticleElementForMenuItemElement (articles, menuItemElement) {
    let articleElement = find(articles, (article) => article.dataset.id === menuItemElement.dataset.id);
    invariant(articleElement, `ReadingItemList.findArticleElementForMenuItemElement(articles, menuItem): menu item element with data-id="${menuItemElement.dataset.id}" has no corresponding article`);
    return articleElement;
  }

  getArticleElementForMenuItemElement (articles) {
    return function (menuItemElement) {
      let articleElement = this.findArticleElementForMenuItemElement(articles, menuItemElement);
      return {
        menuItem: menuItemElement,
        article: articleElement,
      };
    }.bind(this);
  }

  firstItem () {
    return minBy(this.items, 'index');
  }

  lastItem () {
    return maxBy(this.items, 'index');
  }

  itemAtIndex (index) {
    invariant(!isUndefined(index), 'ReadingItemList.itemAtIndex(index): index is undefined');
    return find(this.items, (item) => item.index === index);
  }

  getListItemById (id) {
    invariant(id, 'ReadingItemList.getListItemById(id): id is undefined');
    return find(this.items, (item) => item.id === id);
  }

  setCurrentItemByIndex (index) {
    invariant(!isUndefined(index), 'ReadingItemList.setCurrentItemByIndex(index): index is undefined');
    this.setCurrentItemByAttribute('index', index);
    invariant(this.currentItem, `ReadingItemList.setCurrentItemByIndex(index): no item with the index value of ${index}`);
  }

  setCurrentItemById (id) {
    invariant(id, 'ReadingItemList.setCurrentItemById(id): id is undefined');
    this.setCurrentItemByAttribute('id', id);
    invariant(this.currentItem, `ReadingItemList.setCurrentItemById(id): no item with the id value of "${id}"`);
  }

  setCurrentItemByAttribute (attribute, value) {
    invariant(attribute, 'ReadingItemList.setCurrentItemByAttribute(attribute, value): attribute is undefined');
    invariant(!isUndefined(value), 'ReadingItemList.setCurrentItemByAttribute(attribute, value): value is undefined');
    let listItem = find(this.items, (item) => item[attribute] === value);
    this.setCurrentItem(listItem);
  }

  setCurrentItem (item) {
    this.items.forEach((li) => {
      (li === item) ? li.setAsCurrent() : li.setAsNotCurrent();
    });
    this.currentItem = item;
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
    return some(this.items, (item) => item.fetchPending);
  }

  shouldLoadNextArticle (nextArticle) {
    return !!(
      !this.hasPendingFetch() &&
      nextArticle &&
      nextArticle.isWithinViewThreshold(window.scrollY)
    );
  }

  loadNextArticle () {
    let nextArticle = this.nextItem();
    if (this.shouldLoadNextArticle(nextArticle)) {
      this.isFetchingNextArticle = true;
      nextArticle.loadContent()
        .then(this.handleLoadNextArticleComplete.bind(this));
    }
    else {
      this.isFetchingNextArticle = false;
    }
  }

  handleLoadNextArticleComplete (article) {
    this.isFetchingNextArticle = false;
    this.setCurrentItemById(article.id);
  }
}
