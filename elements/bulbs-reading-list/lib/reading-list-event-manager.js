import invariant from 'invariant';
import ReadingItemList from './reading-item-list';

export default class ReadingListEventManager {
  constructor (element) {
    this.element = element;
    let menu = element.getElementsByTagName('bulbs-reading-list-menu')[0];
    let articles = element.getElementsByTagName('bulbs-reading-list-articles')[0];

    this.scrollCalculationIsIdle = true;
    this.readingItemList = new ReadingItemList(menu, articles);
  }

  handleMenuItemClick (evnt) {
    if (this.elementIsInsideMenu(evnt.target)) {
      evnt.preventDefault();
      let item = this.getClickedMenuItem(evnt.target);
      this.readingItemList.setCurrentItemById(item.id);
    }
  }

  getClickedMenuItem (element) {
    let id = element.closest('bulbs-reading-list-item').dataset.id;
    return this.readingItemList.getListItemById(id);
  }

  elementIsInsideMenu (element) {
    invariant(element, 'BulbsReadingList.elementIsInsideMenu(element): element is undefined');
    return !!element.closest('bulbs-reading-list-menu');
  }

  handleDocumentScrolled () {
    if (!this.readingItemList.isFetchingNextArticle) {
      window.requestAnimationFrame(this.processScrollPosition.bind(this));
    }
  }

  processScrollPosition () {
    if (this.readingItemList.hasMoreItems()) {
      this.readingItemList.loadNextArticle();
    }
    else {
      // load more reading list articles
    }
  }
}
