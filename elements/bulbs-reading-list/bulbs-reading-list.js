import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register';
import invariant from 'invariant';
import './bulbs-reading-list.scss';
import './components/bulbs-reading-list-item';
import './components/bulbs-reading-list-items';
import './components/bulbs-reading-list-menu';
import ReadingListItems from './lib/reading-list-items';
import ReadingListArticles from './lib/reading-list-articles';

class BulbsReadingList extends BulbsHTMLElement {
  attachedCallback () {
    let menu = this.getElementsByTagName('bulbs-reading-list-menu')[0];
    let articles = this.getElementsByTagName('bulbs-reading-list-items')[0];

    this.lastKnownScrollPosition = 0;
    this.scrollCalculationIsIdle = true;
    this.readingListMenu = new ReadingListItems(menu);
    this.articleList = new ReadingListArticles(articles);
    this.addEventListener('click', this.handleMenuItemClick.bind(this));
    window.addEventListener('scroll', this.handleDocumentScrolled.bind(this));
  }

  handleMenuItemClick (evnt) {
    if (this.elementIsInsideMenu(evnt.target)) {
      evnt.preventDefault();
      let item = this.getClickedMenuItem(evnt.target);
      this.readingListMenu.setCurrentListItemById(item.id);
    }
  }

  getClickedMenuItem (element) {
    let id = element.closest('bulbs-reading-list-item').id;
    return this.readingListMenu.getListItemById(id);
  }

  elementIsInsideMenu (element) {
    invariant(element, 'BulbsReadingList.elementIsInsideMenu(element): element is undefined');
    return !!element.closest('bulbs-reading-list-menu');
  }

  handleDocumentScrolled () {
    window.requestAnimationFrame(this.processScrollPosition.bind(this));
  }

  processScrollPosition () {
    console.log(this.lastKnownScrollPosition, window.scrollY);
    console.log(window.scrollY - this.lastKnownScrollPosition);
    this.lastKnownScrollPosition = window.scrollY;
  }
}

registerElement('bulbs-reading-list', BulbsReadingList);

export default BulbsReadingList;
