import {
  find,
  includes,
  isUndefined,
  map,
  maxBy,
  minBy,
  some,
} from 'lodash';
import ReadingListItem from 'reading-list-item';
import invariant from 'invariant';

export default class ReadingList {
  constructor (menu, articles) {
    invariant(menu, 'ReadingList(menu, articles): menu is undefined');
    invariant(articles, 'ReadingList(menu, articles): articles is undefined');

    let elementPairs = this.getReadingListElementPairs(menu, articles);
    this.items = map(elementPairs, this.createReadingListItem);
    this.setCurrentItem(this.firstItem());
    this.isFetchingNextItem = false;
  }

  createReadingListItem (elements, index) {
    return new ReadingListItem(elements.menuItem, elements.article, index);
  }

  getReadingListElementPairs (menu, articles) {
    return map(menu.children, this.getArticleElementForMenuItemElement(articles.children));
  }

  findArticleElementForMenuItemElement (articles, menuItemElement) {
    let articleElement = find(articles, (article) => article.dataset.id === menuItemElement.dataset.id);
    invariant(articleElement, `ReadingList.findArticleElementForMenuItemElement(articles, menuItem): menu item element with data-id="${menuItemElement.dataset.id}" has no corresponding article`);
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

  isFirstItem (item) {
    return item === this.firstItem();
  }

  itemAtIndex (index) {
    invariant(!isUndefined(index), 'ReadingList.itemAtIndex(index): index is undefined');
    return find(this.items, (item) => item.index === index);
  }

  getListItemById (id) {
    invariant(id, 'ReadingList.getListItemById(id): id is undefined');
    return find(this.items, (item) => item.id === id);
  }

  setCurrentItem (item) {
    invariant(item, 'ReadingList.setCurrentItem(item): item is undefined');
    invariant(includes(this.items, item), 'ReadingList.setCurrentItem(item): item is not in reading list');
    this.items.forEach((li) => {
      (li === item) ? li.setAsCurrent() : li.setAsNotCurrent();
    });
    this.currentItem = item;
  }

  isNextItem (listItem) {
    invariant(listItem, 'ReadingList.isNextItem(listItem): listItem is undefined');
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

  previousItem () {
    return this.itemAtIndex(this.currentItem.index - 1);
  }

  setPreviousItemAsCurrent () {
    this.setCurrentItem(this.previousItem());
  }

  isAtTheEnd () {
    return this.currentItem === this.lastItem();
  }

  isMoreThanOneAhead (item) {
    return (item.index - this.currentItem.index) > 1;
  }

  hasMoreItems () {
    return !this.isAtTheEnd();
  }

  hasPendingFetch () {
    return some(this.items, (item) => item.fetchPending);
  }

  shouldLoadNextItem (nextItem) {
    return !!(
      !this.hasPendingFetch() &&
      nextItem &&
      this.currentItem.isAlmostFinished()
    );
  }

  loadNextItem () {
    let nextItem = this.nextItem();

    if (this.shouldLoadNextItem(nextItem)) {
      this.isFetchingNextItem = true;
      nextItem.loadContent()
        .then(this.handleLoadNextArticleComplete.bind(this))
        .catch((reason) => { /* console.log(reason); */ }); // eslint-disable-line
    }
    else {
      this.isFetchingNextItem = false;
    }
  }

  redirectToItem (item) {
    window.location.href = item.href;
  }

  handleLoadNextArticleComplete (nextItem) {
    this.setCurrentItem(nextItem);
    this.isFetchingNextItem = false;
  }

  navigateToItem (item) {
    this.setCurrentItem(item);
    item.scrollIntoView();
    window.history.pushState(null, item.title, item.href);
  }
}
