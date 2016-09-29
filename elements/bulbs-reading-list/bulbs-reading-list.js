import invariant from 'invariant';
import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register';
import './bulbs-reading-list.scss';
import './components/bulbs-reading-list-item';
import './components/bulbs-reading-list-articles';
import './components/bulbs-reading-list-menu';
import ReadingListEventManager from './lib/reading-list-event-manager';

class BulbsReadingList extends BulbsHTMLElement {
  attachedCallback () {
    let stickyNavTetherSelector = this.getAttribute('sticky-nav-tether');
    invariant(stickyNavTetherSelector, '<bulbs-reading-list>: sticky-nav-tether attribute required');

    let eventManager = new ReadingListEventManager(this, stickyNavTetherSelector);
    this.addEventListener('click', eventManager.handleMenuItemClick.bind(eventManager));
    window.addEventListener('scroll', eventManager.handleDocumentScrolled.bind(eventManager));
  }
}

registerElement('bulbs-reading-list', BulbsReadingList);

export default BulbsReadingList;
