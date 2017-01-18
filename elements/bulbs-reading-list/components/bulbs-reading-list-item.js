import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import invariant from 'invariant';

class BulbsReadingListItem extends BulbsHTMLElement {
  connectedCallback () {
    invariant(this.dataset.id, '<bulbs-reading-list-menu> requires a "data-id" attribute');
    invariant(this.dataset.href, '<bulbs-reading-list-menu> requires a "data-href" attribute');
    invariant(this.dataset.partialUrl, '<bulbs-reading-list-menu> requires a "data-partial-url" attribute');
    invariant(this.dataset.title, '<bulbs-reading-list-menu> requires a "data-title" attribute');
  }
}

registerElement('bulbs-reading-list-item', BulbsReadingListItem);

export default BulbsReadingListItem;
