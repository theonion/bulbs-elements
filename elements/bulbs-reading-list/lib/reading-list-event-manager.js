import invariant from 'invariant';
import ReadingList from './reading-list';
import { getScrollOffset } from 'bulbs-elements/util';
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
    let id = element.closest('bulbs-reading-list-item').dataset.id;
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
    let offset = getScrollOffset();

    if (this.isScrollingDown(this.lastKnownScrollPosition, offset.y)) {
      this.readingList.scrollDown();
    }

    if (this.isScrollingUp(this.lastKnownScrollPosition, offset.y)) {
      this.readingList.scrollUp();
    }

    this.lastKnownScrollPosition = offset.y;
  }
}
