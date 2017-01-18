import { BulbsHTMLElement, registerElement } from 'bulbs-elements/register';
import './bulbs-content.scss';

class BulbsContent extends BulbsHTMLElement {
  connectedCallback () {
    if (!this.hasDispatchedReadyEvent) {
      let event = new CustomEvent('bulbs-content-ready');
      this.dispatchEvent(event);
      this.hasDispatchedReadyEvent = true;
    }
  }
}

registerElement('bulbs-content', BulbsContent);
