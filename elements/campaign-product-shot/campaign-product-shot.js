import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import { filterBadResponse, getResponseJSON } from 'bulbs-elements/util';
import invariant from 'invariant';

class CampaignProductShot extends BulbsHTMLElement {

  handleRequestSuccess (data) {
    if (!data.product_shot_url) {
      console.log('Product shot url not set on this campaign');
      return;
    }

    this.innerHTML =
      `<div class='campaign-product-shot'>
        <img src='${data.product_shot_url}'>
      </div>`;
  }

  handleRequestError (error) {
    console.log(error);
  }

  attachedCallback () {
    invariant(!!this.hasAttribute('src'), 'campaign-product-shot component requires a src');
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

registerElement('campaign-product-shot', CampaignProductShot);

export default CampaignProductShot;
