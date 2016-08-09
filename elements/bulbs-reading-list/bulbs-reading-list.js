import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import './components/reading-list-item';
import './components/reading-list-menu';
import './bulbs-reading-list.scss';

class BulbsReadingList extends BulbsHTMLElement {
  attachedCallback () {
    this.readingListItemElements = document.getElementsByTagName('bulbs-reading-list-item');
    console.log(this);
  }
}

registerElement('bulbs-reading-list', BulbsReadingList);

export default BulbsReadingList;
