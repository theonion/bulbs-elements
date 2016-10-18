import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import './bulbs-page-state.scss';

export default class BulbsPage-state extends BulbsHTMLElement {
  createdCallback () {
    console.log('Created bulbs-page-state');
  }

  attachedCallback () {
    console.log('Attached bulbs-page-state');
  }

  detachedCallback () {
    console.log('Detached bulbs-page-state');
  }

  attributeChangedCallback (name, previousValue, value) {
    console.log(
      'Attribute Changed bulbs-page-state changed ${name} from: ',
      previousValue, 'to:', value
    );
  }
}

registerElement('bulbs-page-state', BulbsPage-state);
