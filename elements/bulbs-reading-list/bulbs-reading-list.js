import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register-element';
import './components/bulbs-reading-list-item';
import './components/bulbs-reading-list-articles';

class BulbsReadingList extends BulbsHTMLElement {
  attachedCallback () {
  }
}

registerElement('bulbs-reading-list', BulbsReadingList);

export default BulbsReadingList;
