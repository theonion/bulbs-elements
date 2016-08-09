import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';

class BulbsReadingListItem extends BulbsHTMLElement {
  attachedCallback () {
    console.log('BulbsReadingListItem attached', this);
  }
}

registerElement('bulbs-reading-list-item', BulbsReadingListItem);

export default BulbsReadingListItem;
