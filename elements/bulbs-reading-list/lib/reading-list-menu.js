import invariant from 'invariant';
import { map, isUndefined } from 'lodash';
import { InViewMonitor } from 'bulbs-elements/util';
import ReadingListMenuItem from './reading-list-menu-item';

export default class ReadingListMenu {
  constructor (element, dispatcher) {
    invariant(element, 'new ReadingListMenu(element, dispatcher): element is undefined');
    invariant(dispatcher, 'new ReadingListMenu(element, dispatcher): dispatcher is undefined');

    this.element = element;
    this.dispatcher = dispatcher;
    this.readingListId = parseInt(element.getAttribute('reading-list-id'), 10);
    this.pinnedContainer = this.findPinnedContainer(element.getAttribute('pinned-container-selector'));
    this.articlesContainer = this.findArticlesContainer(this.readingListId);
    this.fixedMenuMinWidth = parseInt(this.element.getAttribute('fixed-menu-min-width'), 10);
    const itemElements = element.querySelectorAll('bulbs-reading-list-item');
    this.menuItems = this.createMenuItems(itemElements);
    this.firstItem().setAsCurrent();
    this.registerEvents();
  }

  findPinnedContainer (selector) {
    invariant(selector, 'ReadingListMenu.findPinnedContainer(selector): selector is undefined');
    const container = document.querySelector(selector);
    invariant(container, `ReadingListMenu.findPinnedContainer(selector): there is no DOM element found with selector ${selector}`);
    return container;
  }

  findArticlesContainer (readingListId) {
    invariant(!isUndefined(readingListId), 'ReadingListMenu.findArticlesContainer(readingListId): readingListId is undefined');
    const articlesContainer = document.querySelector(`bulbs-reading-list-articles[reading-list-id='${readingListId}']`);
    invariant(articlesContainer, `ReadingListMenu.findArticlesContainer(readingListId): there is no bulbs-reading-list-articles element found with the id ${readingListId}`);
    return articlesContainer;
  }

  createMenuItems (itemElements) {
    invariant(itemElements, 'ReadingListMenu.createMenuItems(itemElements): itemElements is undefined');
    return map(itemElements, this.createMenuItem.bind(this));
  }

  createMenuItem (itemElement, index) {
    invariant(itemElement, 'ReadingListMenu.createMenuItem(itemElement, index): itemElement is undefined');
    invariant(!isUndefined(index), 'ReadingListMenu.createMenuItem(itemElement, index): index is undefined');
    return new ReadingListMenuItem(itemElement, this.dispatcher, index);
  }

  firstItem () {
    return this.menuItems[0];
  }

  getDimensions () {
    return {
      articles: this.articlesContainer.getBoundingClientRect(),
      menuContainer: this.pinnedContainer.getBoundingClientRect(),
      menu: this.element.getBoundingClientRect(),
    };
  }

  registerEvents () {
    this.dispatcher.on('scroll-down', this.handleScrollDown.bind(this));
    this.dispatcher.on('scroll-up', this.handleScrollUp.bind(this));
    this.dispatcher.on('reading-list-item-clicked', this.handleMenuItemClicked.bind(this));
  }

  handleScrollDown () {
    if (this.menuIsBelowArticles()) {
      this.pinMenuToArticlesBottom();
    }
    else if (this.menuIsScrolledToTop()) {
      this.pinMenuToTop();
    }
    else {
      this.pinMenuToArticlesTop();
    }
  }

  handleScrollUp () {
    if (this.menuIsOffScreen() && this.articlesAreBelowMenu()) {
      this.pinMenuToArticlesBottom();
    }
    else if (this.articlesAreBelowMenuContainer()) {
      this.pinMenuToArticlesTop();
    }
    else {
      this.pinMenuToTop();
    }
  }

  menuIsBelowArticles () {
    const dimensions = this.getDimensions();
    return dimensions.menu.bottom > dimensions.articles.bottom;
  }

  menuIsScrolledToTop () {
    const dimensions = this.getDimensions();
    return dimensions.menu.top <= 0;
  }

  menuIsOffScreen () {
    const dimensions = this.getDimensions();
    return dimensions.menu.top < 0;
  }

  isCurrentMenuInViewport () {
    return InViewMonitor.isElementInViewport(
      this.element,
      this.element.getBoundingClientRect()
    );
  }

  articlesAreBelowMenu () {
    const dimensions = this.getDimensions();
    return dimensions.articles.bottom > dimensions.menu.bottom;
  }

  articlesAreBelowMenuContainer () {
    const dimensions = this.getDimensions();
    return dimensions.articles.top > dimensions.menuContainer.top;
  }

  pinMenuToArticlesBottom () {
    const dimensions = this.getDimensions();
    const topOffset = dimensions.articles.bottom - dimensions.menuContainer.height;
    this.pinnedContainer.style.top = `${topOffset}px`;
  }

  pinMenuToTop () {
    const dimensions = this.getDimensions();
    const offset = dimensions.menuContainer.top - dimensions.menu.top;
    this.pinnedContainer.style.top = `${offset}px`;
  }

  pinMenuToArticlesTop () {
    const dimensions = this.getDimensions();
    this.pinnedContainer.style.top = `${dimensions.articles.top}px`;
  }

  handleMenuItemClicked (menuItem) {
    this.menuItems.forEach((item) => {
      (item === menuItem) ? item.setAsCurrent() : item.setAsNotCurrent();
    });
  }

  isNextItem (menuItem) {
    invariant(menuItem, 'ReadingListMenu.isNextItem(menuItem): menuItem is undefined');
    let nextItem = this.itemAtIndex(this.currentItem.index + 1);
    return nextItem ? (menuItem.index === nextItem.index) : false;
  }
}
