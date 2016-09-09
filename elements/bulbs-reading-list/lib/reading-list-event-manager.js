import invariant from 'invariant';
import ReadingList from './reading-list';
import { getScrollOffset, getWindowDimensions } from 'bulbs-elements/util';
import { isUndefined } from 'lodash';

export default class ReadingListEventManager {
  constructor (element) {
    this.element = element;
    let menu = element.getElementsByTagName('bulbs-reading-list-menu')[0];
    let articles = element.getElementsByTagName('bulbs-reading-list-articles')[0];

    this.scrollCalculationIsIdle = true;
    this.lastKnownScrollPosition = 0;
    this.readingList = new ReadingList(menu, articles);
  }

  handleMenuItemClick (evnt) {
    if (this.elementIsInsideMenu(evnt.target)) {
      evnt.preventDefault();
      let item = this.getClickedMenuItem(evnt.target);

      if (this.readingList.isMoreThanOneAhead(item)) {
        this.readingList.redirectToItem(item);
      }
      else if (item.isLoaded) {
        this.readingList.navigateToItem(item);
      }
      else if (this.readingList.isNextItem(item)) {
        this.readingList.loadNextItem();
      }
    }
  }

  getClickedMenuItem (element) {
    let id = element.closest('bulbs-reading-list-item').dataset.id;
    return this.readingList.getListItemById(id);
  }

  elementIsInsideMenu (element) {
    invariant(element, 'BulbsReadingList.elementIsInsideMenu(element): element is undefined');
    return !!element.closest('bulbs-reading-list-menu');
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

  shouldFetchNextItem (offset) {
    invariant(!isUndefined(offset), 'ReadingListEventManager.shouldFetchNextItem(offset): offset is undefined');

    return this.isScrollingDown(this.lastKnownScrollPosition, offset) && !this.readingList.isFetchingNextItem;
  }

  shouldSetPreviousItemToCurrent (offset) { // eslint-disable-line consistent-return
    if (this.isScrollingUp(this.lastKnownScrollPosition, offset)) {
      let windowDimensions = getWindowDimensions();
      let articleBounds = this.readingList.currentItem.articleElement.getBoundingClientRect();

      return articleBounds.top > windowDimensions.height;
    }
  }

  handleDocumentScrolled () {
    let offset = getScrollOffset();

    if (this.shouldFetchNextItem(offset.y)) {
      window.requestAnimationFrame(this.processScrollPosition.bind(this));
    }

    if (this.shouldSetPreviousItemToCurrent(offset.y)) {
      this.readingList.setPreviousItemAsCurrent();
    }

    this.lastKnownScrollPosition = offset.y;
  }

  processScrollPosition () {
    if (this.readingList.hasMoreItems()) {
      this.readingList.loadNextItem();
    }
  }
}
