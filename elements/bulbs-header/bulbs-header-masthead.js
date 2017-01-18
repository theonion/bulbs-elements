import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register';
import { InViewMonitor } from 'bulbs-elements/util';

class BulbsHeaderMasthead extends BulbsHTMLElement {
  connectedCallback () {
    InViewMonitor.add(this);
  }

  disconnectedCallback () {
    InViewMonitor.remove(this);
  }
}

registerElement('bulbs-header-masthead', BulbsHeaderMasthead);

export default BulbsHeaderMasthead;
