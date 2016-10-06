import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register';
import './bulbs-reading-list.scss';
import './components/bulbs-reading-list-item';
import './components/bulbs-reading-list-articles';
import './components/bulbs-reading-list-menu';
import ReadingListEventManager from './lib/reading-list-event-manager';

class BulbsReadingList extends BulbsHTMLElement {
  attachedCallback () {
    let eventManager = new ReadingListEventManager(this);
    this.addEventListener('click', eventManager.handleMenuItemClick.bind(eventManager));
    window.addEventListener('scroll', eventManager.handleDocumentScrolled.bind(eventManager));
    window.addEventListener('resize', eventManager.setMenuPosition.bind(eventManager));
  }
}

registerElement('bulbs-reading-list', BulbsReadingList);

export default BulbsReadingList;
