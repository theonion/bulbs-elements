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
    let pinnedContainerSelector = this.getAttribute('pinned-container');
    let pinnedContainerMinWidth = this.getAttribute('pinned-container-min-width');
    let pinnedTetherSelector = this.getAttribute('pinned-tether');
    invariant(stickyNavTetherSelector, '<bulbs-reading-list>: sticky-nav-tether attribute required');
    invariant(pinnedContainerSelector, '<bulbs-reading-list>: pinned-container attribute required');

    let eventManager = new ReadingListEventManager(this, {
      stickyNavTetherSelector,
      pinnedContainerSelector,
      pinnedContainerMinWidth,
      pinnedTetherSelector,
    });
    this.addEventListener('click', eventManager.handleMenuItemClick.bind(eventManager));
    window.addEventListener('scroll', eventManager.handleDocumentScrolled.bind(eventManager));
    window.addEventListener('resize', eventManager.positionPinnedContainer.bind(eventManager));
  }
}

registerElement('bulbs-reading-list', BulbsReadingList);

export default BulbsReadingList;
