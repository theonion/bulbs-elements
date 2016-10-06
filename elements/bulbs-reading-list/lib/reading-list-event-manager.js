import invariant from 'invariant';
import ReadingList from './reading-list';
import { getScrollOffset, getWindowDimensions } from 'bulbs-elements/util';
import { isUndefined } from 'lodash';
// TODO use waypoints instead of custom logic

export default class ReadingListEventManager {
  constructor (element) {
    invariant(element, 'new ReadingListEventManager(element): element is undefined');
    this.element = element;
    this.menuElement = element.getElementsByTagName('bulbs-reading-list-menu')[0];
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
    const viewport = getWindowDimensions();
    const mobileMaxWidth = 768;

    if (viewport.width < mobileMaxWidth) {
      return;
    }

    const topOffset = this.calculateMenuTopOffset();
    this.pinnedContainer.style.top = `${topOffset}px`;
  }

  calculateMenuTopOffset () {
    const dimensions = this.getDimensions();
    const offset = getScrollOffset();
    const scrollingDown = this.isScrollingDown(this.lastKnownScrollPosition, offset.y);

    if (scrollingDown) {
      if (this.isStillScrollingArticles()) {
        if (dimensions.articles.top + dimensions.ad.height > 0) {
          return dimensions.articles.top;
        }

        return dimensions.ad.height * -1;
      }

      const difference = dimensions.menu.bottom - dimensions.articles.bottom;
      return (dimensions.menu.top - dimensions.ad.height) - difference;
    }

    if (dimensions.articles.bottom > dimensions.menu.bottom) {
      const difference = dimensions.menu.bottom - dimensions.articles.bottom;
      return (dimensions.menu.top - dimensions.ad.height) - difference;
    }

    if (dimensions.ad.top > 0) {
      return dimensions.articles.top;
    }
  }

  getFullAdHeight (adDimensions) {
    const bottomMarginStyle = getComputedStyle(this.adElement).marginBottom;
    const bottomMargin = parseInt(bottomMarginStyle.replace(/px/, ''), 10);

    return Object.assign({
      height: adDimensions.height + bottomMargin,
    }, adDimensions);
  }

  isStillScrollingArticles () {
    const dimensions = this.getDimensions();
    if (this.readingList.hasMoreItems()) {
      return true;
    }
    return dimensions.articles.bottom > dimensions.menu.bottom;
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

    this.resetMenuPosition();

    if (this.isScrollingDown(this.lastKnownScrollPosition, offset.y)) {
      this.readingList.scrollDown();
    }

    if (this.isScrollingUp(this.lastKnownScrollPosition, offset.y)) {
      this.readingList.scrollUp();
    }

    this.lastKnownScrollPosition = offset.y;
  }
}
