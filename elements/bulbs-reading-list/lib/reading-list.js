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

  getReadingListElementPairs (menu, articles) {
    return map(menu.children, this.getArticleElementForMenuItemElement(articles.children));
  }

  createReadingListItem (elements, index) {
    return new ReadingListItem(elements.menuItem, elements.article, index);
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

  findArticleElementForMenuItemElement (articles, menuItemElement) {
    let articleElement = find(articles, (article) => article.dataset.id === menuItemElement.dataset.id);
    invariant(articleElement, `ReadingList.findArticleElementForMenuItemElement(articles, menuItem): menu item element with data-id="${menuItemElement.dataset.id}" has no corresponding article`);
    return articleElement;
  }

  firstItem () {
    return minBy(this.items, 'index');
  }

  lastItem () {
    return maxBy(this.items, 'index');
  }

  nextItem () {
    return this.itemAtIndex(this.currentItem.index + 1);
  }

  previousItem () {
    return this.itemAtIndex(this.currentItem.index - 1);
  }

  itemAtIndex (index) {
    invariant(!isUndefined(index), 'ReadingList.itemAtIndex(index): index is undefined');
    return find(this.items, (item) => item.index === index);
  }

  getListItemById (id) {
    invariant(id, 'ReadingList.getListItemById(id): id is undefined');
    return find(this.items, (item) => item.id === id);
  }

  isFirstItem (item) {
    return item === this.firstItem();
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

  isAtTheEnd () {
    return this.currentItem === this.lastItem();
  }

  isMoreThanOneAhead (item) {
    return (item.index - this.currentItem.index) > 1;
  }

  hasMoreItems () {
    return !this.isAtTheEnd();
  }

  setCurrentItem (item) {
    invariant(item, 'ReadingList.setCurrentItem(item): item is undefined');
    invariant(includes(this.items, item), 'ReadingList.setCurrentItem(item): item is not in reading list');
    this.items.forEach((li) => {
      (li === item) ? li.setAsCurrent() : li.setAsNotCurrent();
    });
    this.currentItem = item;
    window.history.pushState(null, item.title, item.href);
  }

  setPreviousItemAsCurrent () {
    let previousItem = this.previousItem();
    if (previousItem) { this.setCurrentItem(previousItem); }
  }

  setNextItemAsCurrent () {
    let nextItem = this.nextItem();
    if (nextItem) { this.setCurrentItem(nextItem); }
  }

  hasPendingFetch () {
    return some(this.items, (item) => item.fetchPending);
  }

  scrollUp () {
    this.updateItemProgress();
    if (this.currentItem.progress === 0) {
      this.setPreviousItemAsCurrent();
    }
  }

  scrollDown () {
    this.updateItemProgress();
    let nextItem = this.nextItem();

    if (this.shouldLoadNextItem(nextItem)) {
      this.loadNextItem();
    }

    if (this.currentItem.progress === 100) {
      this.setNextItemAsCurrent();
    }
  }

  shouldLoadNextItem (nextItem) {
    return !!(
      !this.hasPendingFetch() &&
      nextItem &&
      !nextItem.isLoaded &&
      nextItem.isNearlyInView()
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

  handleLoadNextArticleComplete () {
    this.isFetchingNextItem = false;
  }

  navigateToItem (item) {
    this.setCurrentItem(item);
    item.scrollIntoView();
  }

  updateItemProgress () {
    this.items.forEach((item) => item.updateProgress());
  }
}
