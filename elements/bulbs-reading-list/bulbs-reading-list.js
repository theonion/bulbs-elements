import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register';
import invariant from 'invariant';
import './bulbs-reading-list.scss';
import './components/bulbs-reading-list-item';
import './components/bulbs-reading-list-menu';
import './components/bulbs-reading-list-articles';
import ReadingListItems from './lib/reading-list-items';

class BulbsReadingList extends BulbsHTMLElement {
  attachedCallback () {
    let menu = this.getElementsByTagName('bulbs-reading-list-menu')[0];
    let articles = this.getElementsByTagName('bulbs-reading-list-articles')[0];

    this.readingListMenu = new ReadingListItems(menu);
    this.articleList = new ReadingListItems(articles);
    this.addEventListener('click', this.handleMenuItemClick.bind(this));
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
}

registerElement('bulbs-reading-list', BulbsReadingList);

export default BulbsReadingList;
