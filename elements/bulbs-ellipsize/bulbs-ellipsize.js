import { BulbsHTMLElement, registerElement } from 'bulbs-elements/register';
import invariant from 'invariant';
import truncate from 'truncate.js'; // eslint-disable-line no-unused-vars

class BulbsEllipsize extends BulbsHTMLElement {
  attachedCallback () {
    invariant(this.getAttribute('line-count'),
      'BulbsEllipsize: Expects a line-count attribute');
    if (!this.textContent) { return; }

    this.truncate();
  }

  truncate () {
    let lineCount = parseInt(this.getAttribute('line-count'), 10);

    $(this).truncate({ lines: lineCount, ellipsis: '...' });
  }
}

registerElement('bulbs-ellipsize', BulbsEllipsize);
export default BulbsEllipsize;
