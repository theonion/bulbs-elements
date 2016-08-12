import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';

class BulbsReadingListItems extends BulbsHTMLElement {}

registerElement('bulbs-reading-list-articles', BulbsReadingListItems);

export default BulbsReadingListItems;
