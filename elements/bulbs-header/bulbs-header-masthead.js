import { registerElement, BulbsHTMLElement } from 'bulbs-elements/register-element';
import { InViewMonitor } from 'bulbs-elements/util';

class BulbsHeaderMasthead extends BulbsHTMLElement {
  attachedCallback () {
    InViewMonitor.add(this);
  }

  detachedCallback () {
    InViewMonitor.remove(this);
  }
}

registerElement('bulbs-header-masthead', BulbsHeaderMasthead);

export default BulbsHeaderMasthead;
