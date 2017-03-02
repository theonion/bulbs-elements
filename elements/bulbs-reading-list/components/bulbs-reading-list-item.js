import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import invariant from 'invariant';

class BulbsReadingListItem extends BulbsHTMLElement {
  attachedCallback () {
    invariant(this.dataset.id, '<bulbs-reading-list-menu> requires a "data-id" attribute');
    invariant(this.dataset.href, '<bulbs-reading-list-menu> requires a "data-href" attribute');
    invariant(this.dataset.partialUrl, '<bulbs-reading-list-menu> requires a "data-partial-url" attribute');
    invariant(this.dataset.title, '<bulbs-reading-list-menu> requires a "data-title" attribute');

    const siblings = this.closest('bulbs-reading-list').querySelectorAll('bulbs-reading-list-item');
    const index = [].indexOf.call(siblings, this) + 1; // 0 indexed
    this.setAttribute('data-track-action', `Article: ${index}`);
  }
}

registerElement('bulbs-reading-list-item', BulbsReadingListItem);

export default BulbsReadingListItem;
