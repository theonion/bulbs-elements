import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';

class BulbsReadingListItem extends BulbsHTMLElement {
  attachedCallback () {

  }
}

registerElement('bulbs-reading-list-item', BulbsReadingListItem);

export default BulbsReadingListItem;
