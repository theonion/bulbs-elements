import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import './campaign-display.scss';

class CampaignDisplay extends BulbsHTMLElement {
  createdCallback () {
    console.log('Created campaign-display');
  }

  attachedCallback () {
    console.log('Attached campaign-display');
  }

  detachedCallback () {
    console.log('Detached campaign-display');
  }

  attributeChangedCallback (name, previousValue, value) {
    console.log(
      'Attribute Changed campaign-display changed ${name} from: ',
      previousValue, 'to:', value
    );
  }
}

registerElement('campaign-display', CampaignDisplay);

export default CampaignDisplay;
