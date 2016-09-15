import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import { filterBadResponse, getResponseJSON } from 'bulbs-elements/util';
import invariant from 'invariant';

class CampaignProductShot extends BulbsHTMLElement {

  handleRequestSuccess (data) {
    this.innerHTML =
      `<div class='campaign-brand-messaging'>
        <span>${data.brand_messaging}</span>
      </div>`;
  }

  handleRequestError (error) {
    console.log(error);
  }

  attachedCallback () {
    invariant(!!this.hasAttribute('src'), 'campaign-brand-messaging component requires a src');
    fetch(this.getAttribute('src'))
      .then(filterBadResponse)
      .then(getResponseJSON)
      .then(this.handleRequestSuccess.bind(this))
      .catch(this.handleRequestError);
  }

  detachedCallback () {
    console.log('Detached campaign-brand-messaging');
  }

  attributeChangedCallback (name, previousValue, value) {
    if (document.body.contains(this)) {
      if (name === 'src' && previousValue !== value) {
        this.attachedCallback();
      }

      console.log(
        'Attribute Changed campaign-brand-messaging changed ${name} from: ',
        previousValue, 'to:', value
      );
    }
  }
}

registerElement('campaign-brand-messaging', CampaignProductShot);

export default CampaignProductShot;
