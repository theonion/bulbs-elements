import { BulbsHTMLElement, registerElement } from 'bulbs-elements/register';
import invariant from 'invariant';
import Truncate from 'truncate.js';

class BulbsEllipsize extends BulbsHTMLElement {
  attachedCallback () {
    invariant(this.getAttribute('line-count'),
      'BulbsEllipsize: Expects a line-count attribute');
    if (!this.textContent) { return; }

    let lineCount = parseInt(this.getAttribute('line-count'));

    debugger;
    $(this).truncate({ lines: {lineCount} });
  }
};

registerElement('bulbs-ellipsize', BulbsEllipsize);
export default BulbsEllipsize;
