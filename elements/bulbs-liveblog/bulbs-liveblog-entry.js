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

    // doing bad parent access because event emitters weren't working
    if (this.liveblog && this.liveblog.handleEntryAttached) {
      this.liveblog.handleEntryAttached({ target: this });
    }

    if (typeof twttr !== 'undefined') {
      twttr.widgets.load();
    }
  }

  detachedCallback () {
    // doing bad parent access because event emitters weren't working
    if (this.liveblog && this.liveblog.handleEntryDetached) {
      this.liveblog.handleEntryDetached({ target: this });
    }
  }

  get published () {
    return new Date(this.getAttribute('entry-published'));
  }

  get liveblog () {
    return this.closest('bulbs-liveblog');
  }
}

registerElement('bulbs-liveblog-entry', BulbsLiveblogEntry);
