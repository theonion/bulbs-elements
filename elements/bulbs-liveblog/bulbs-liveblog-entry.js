import { BulbsHTMLElement, registerElement } from 'bulbs-elements/register';
import invariant from 'invariant';

class BulbsLiveblogEntry extends BulbsHTMLElement {
  attachedCallback () {
    invariant(this.closest('bulbs-liveblog'),
      '<bulbs-liveblog-entry> element MUST be placed within a <bulbs-liveblog>');

    invariant(this.hasAttribute('entry-id'),
       '<bulbs-liveblog-entry> element MUST specify an `entry-id` attribute');

    invariant(this.hasAttribute('entry-published'),
       '<bulbs-liveblog-entry> element MUST specify an `entry-published` attribute');

    this.dispatchEvent(new CustomEvent('liveblog-entry-attached'));
  }

  detachedCallback () {
    this.dispatchEvent(new CustomEvent('liveblog-entry-detached'));
  }

  get published () {
    return new Date(this.getAttribute('entry-published'));
  }
}

registerElement('bulbs-liveblog-entry', BulbsLiveblogEntry);
