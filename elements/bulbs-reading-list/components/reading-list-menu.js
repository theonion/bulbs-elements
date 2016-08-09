import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';

class BulbsReadingListMenu extends BulbsHTMLElement {
  attachedCallback () {
    console.log('BulbsReadingListMenu attached', this);
  }
}

registerElement('bulbs-reading-list-menu', BulbsReadingListMenu);

export default BulbsReadingListMenu;
