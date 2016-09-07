import invariant from 'invariant';
import ReadingList from './reading-list';

export default class ReadingListEventManager {
  constructor (element) {
    this.element = element;
    let menu = element.getElementsByTagName('bulbs-reading-list-menu')[0];
    let articles = element.getElementsByTagName('bulbs-reading-list-articles')[0];

    this.scrollCalculationIsIdle = true;
    this.readingList = new ReadingList(menu, articles);
  }

  handleMenuItemClick (evnt) {
    if (this.elementIsInsideMenu(evnt.target)) {
      evnt.preventDefault();
      let item = this.getClickedMenuItem(evnt.target);
      if (this.readingList.isMoreThanOneAhead(item)) {
        this.readingList.redirectToItem(item);
      }
      else if (item.isLoaded()) {
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

  handleDocumentScrolled () {
    if (!this.readingList.isFetchingNextItem) {
      window.requestAnimationFrame(this.processScrollPosition.bind(this));
    }
  }

  processScrollPosition () {
    if (this.readingList.hasMoreItems()) {
      this.readingList.loadNextItem();
    }
  }
}
