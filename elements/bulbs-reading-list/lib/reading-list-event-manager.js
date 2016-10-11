import invariant from 'invariant';
import ReadingList from './reading-list';
import { getScrollOffset, getWindowDimensions } from 'bulbs-elements/util';
import { isUndefined } from 'lodash';

export default class ReadingListEventManager {
  constructor (element) {
    invariant(element, 'new ReadingListEventManager(element): element is undefined');
    this.element = element;
    this.menuElement = element.getElementsByTagName('bulbs-reading-list-menu')[0];
    this.fixedMenuMinWidth = parseInt(this.menuElement.getAttribute('fixed-menu-min-width'), 10);
    this.articlesElement = element.getElementsByTagName('bulbs-reading-list-articles')[0];
    this.scrollCalculationIsIdle = true;
    this.lastKnownScrollPosition = 0;
    this.readingList = new ReadingList(this.menuElement, this.articlesElement);
    this.articlesContainer = document.querySelector('bulbs-reading-list-articles').parentElement;
    this.pinnedContainer = this.menuElement.closest('bulbs-flyover-menu');
    this.adElement = this.pinnedContainer.querySelector('.dfp-slot-sidebar-primary');
    this.setMenuPosition();
  }

  setMenuPosition () {
    const dimensions = this.getDimensions();
    const leftOffset = dimensions.articles.right - dimensions.menuContainer.width;

    this.pinnedContainer.style.position = 'fixed';
    this.pinnedContainer.style.top = `${dimensions.articles.top}px`;
    this.pinnedContainer.style.left = `${leftOffset}px`;
  }

  getDimensions () {
    return {
      articles: this.articlesContainer.getBoundingClientRect(),
      menuContainer: this.pinnedContainer.getBoundingClientRect(),
      menu: this.menuElement.getBoundingClientRect(),
      ad: this.getFullAdHeight(this.adElement.getBoundingClientRect()),
    };
  }

  resetMenuPosition () {
    const offset = getScrollOffset();
    if (this.isScrollingDown(this.lastKnownScrollPosition, offset.y)) {
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
    else {
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
  }

  menuIsBelowArticles () {
    const dimensions = this.getDimensions();
    return dimensions.menu.bottom > dimensions.articles.bottom;
  }

  menuIsOffScreen () {
    const dimensions = this.getDimensions();
    return dimensions.menu.top < 0;
  }

  articlesAreBelowMenu () {
    const dimensions = this.getDimensions();
    return dimensions.articles.bottom > dimensions.menu.bottom;
  }

  articlesAreBelowMenuContainer () {
    const dimensions = this.getDimensions();
    return dimensions.articles.top > dimensions.menuContainer.top;
  }

  menuIsScrolledToTop () {
    const dimensions = this.getDimensions();
    return dimensions.menu.top <= 0;
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

  getFullAdHeight (adDimensions) {
    const bottomMarginStyle = getComputedStyle(this.adElement).marginBottom;
    const bottomMargin = parseInt(bottomMarginStyle.replace(/px/, ''), 10);

    return Object.assign({
      height: adDimensions.height + bottomMargin,
    }, adDimensions);
  }

  handleMenuItemClick (evnt) {
    if (this.elementIsInsideMenu(evnt.target)) {
      evnt.preventDefault();
      const item = this.getClickedMenuItem(evnt.target);

      if (item.isLoaded) {
        this.readingList.navigateToItem(item);
      }
      else if (this.readingList.isNextItem(item)) {
        if (this.readingList.shouldLoadNextItem(item)) {
          this.readingList.loadNextItem()
            .then(this.handleLoadNextItemComplete.bind(this));
        }
      }
      else if (this.readingList.isMoreThanOneAhead(item)) {
        this.readingList.redirectToItem(item);
      }
    }
  }

  handleLoadNextItemComplete (item) {
    this.readingList.navigateToItem(item);
  }

  elementIsInsideMenu (element) {
    invariant(element, 'BulbsReadingList.elementIsInsideMenu(element): element is undefined');
    return !!element.closest('bulbs-reading-list-menu');
  }

  getClickedMenuItem (element) {
    const id = element.closest('bulbs-reading-list-item').dataset.id;
    return this.readingList.getListItemById(id);
  }

  isScrollingUp (lastOffset, currentOffset) {
    invariant(!isUndefined(lastOffset), 'ReadingListEventManager.isScrollingUp(lastOffset, currentOffset): lastOffset is undefined');
    invariant(!isUndefined(currentOffset), 'ReadingListEventManager.isScrollingUp(lastOffset, currentOffset): currentOffset is undefined');

    return lastOffset > currentOffset;
  }

  isScrollingDown (lastOffset, currentOffset) {
    invariant(!isUndefined(lastOffset), 'ReadingListEventManager.isScrollingDown(lastOffset, currentOffset): lastOffset is undefined');
    invariant(!isUndefined(currentOffset), 'ReadingListEventManager.isScrollingDown(lastOffset, currentOffset): currentOffset is undefined');

    return lastOffset < currentOffset;
  }

  handleDocumentScrolled () {
    window.requestAnimationFrame(this.processScrollPosition.bind(this));
  }

  processScrollPosition () {
    const offset = getScrollOffset();
    const windowDimensions = getWindowDimensions();

    if (windowDimensions.width > this.fixedMenuMinWidth) {
      this.resetMenuPosition();
    }

    if (this.isScrollingDown(this.lastKnownScrollPosition, offset.y)) {
      this.readingList.scrollDown();
    }

    if (this.isScrollingUp(this.lastKnownScrollPosition, offset.y)) {
      this.readingList.scrollUp();
    }

    this.lastKnownScrollPosition = offset.y;
  }
}
