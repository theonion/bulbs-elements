import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import invariant from 'invariant';

class ReadingListArticles extends BulbsHTMLElement {
  connectedCallback () {
    invariant(this.getAttribute('reading-list-id'), '<bulbs-reading-list-articles> requires a "reading-list-id" attribute');
  }
}

registerElement('bulbs-reading-list-articles', ReadingListArticles);

export default ReadingListArticles;
