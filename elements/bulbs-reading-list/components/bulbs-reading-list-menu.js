import invariant from 'invariant';
import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';

class BulbsReadingListMenu extends BulbsHTMLElement {
  attachedCallback () {
    invariant(this.getAttribute('reading-list-id'), '<bulbs-reading-list-menu> requires a "reading-list-id" attribute');
    invariant(this.getAttribute('fixed-menu-min-width'), '<bulbs-reading-list-menu> requires a "fixed-menu-min-width" attribute');
    invariant(this.getAttribute('pinned-container-selector'), '<bulbs-reading-list-menu> requires a "pinned-container-selector" attribute');
    invariant(this.getAttribute('articles-container-selector'), '<bulbs-reading-list-menu> requires a "articles-container-selector" attribute');
  }
}

registerElement('bulbs-reading-list-menu', BulbsReadingListMenu);

export default BulbsReadingListMenu;
