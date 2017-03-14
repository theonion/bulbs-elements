import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register';
import './components/bulbs-reading-list-item';
import './components/bulbs-reading-list-articles';
import invariant from 'invariant';

class BulbsReadingList extends BulbsHTMLElement {
  attachedCallback () {
  }
}

registerElement('bulbs-reading-list', BulbsReadingList);

export default BulbsReadingList;
