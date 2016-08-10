import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';

class BulbsReadingListMenu extends BulbsHTMLElement {
  attachedCallback () {
  }
}

registerElement('bulbs-reading-list-menu', BulbsReadingListMenu);

export default BulbsReadingListMenu;
