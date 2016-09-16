import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import { filterBadResponse, getResponseJSON } from 'bulbs-elements/util';
import invariant from 'invariant';

class CampaignProductShot extends BulbsHTMLElement {

  handleRequestSuccess (data) {
    invariant(data.product_shot_url, 'CampaignProductShot.handleRequestSuccess(data): data.brand_messaging is undefined');
    this.innerHTML =
      `<div class='campaign-brand-messaging'>
        <span>${data.brand_messaging}</span>
      </div>`;
  }

  handleRequestError (error) {
    console.log(error);
  }

  attachedCallback () {
    invariant(this.hasAttribute('src'), 'campaign-brand-messaging component requires a src');
    fetch(this.getAttribute('src'))
      .then(filterBadResponse)
      .then(getResponseJSON)
      .then(this.handleRequestSuccess.bind(this))
      .catch(this.handleRequestError);
  }

  attributeChangedCallback (name, previousValue, value) {
    if (document.body.contains(this)) {
      if (name === 'src' && previousValue !== value) {
        this.attachedCallback();
      }
    }
  }
}

registerElement('campaign-brand-messaging', CampaignProductShot);

export default CampaignProductShot extends BulbsHTMLElement;
