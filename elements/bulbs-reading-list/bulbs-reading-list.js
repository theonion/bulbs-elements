import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import './bulbs-reading-list.scss';

class BulbsReading-list extends BulbsHTMLElement {
  createdCallback () {
    console.log('Created bulbs-reading-list');
  }

  attachedCallback () {
    console.log('Attached bulbs-reading-list');
  }

  detachedCallback () {
    console.log('Detached bulbs-reading-list');
  }

  attributeChangedCallback (name, previousValue, value) {
    console.log(
      'Attribute Changed bulbs-reading-list changed ${name} from: ',
      previousValue, 'to:', value
    );
  }
}

registerElement('bulbs-reading-list', BulbsReading-list);

export default BulbsReading-list;
