import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import { filterBadResponse, getResponseJSON } from 'bulbs-elements/util';
import invariant from 'invariant';

class CampaignProductShot extends BulbsHTMLElement {

  handleRequestSuccess (data) {
    this.innerHTML =
      `<div class='campaign-product-shot'>
        <img src='${data.product_shot_url}'>
      </div>`;
  }

  handleRequestError () {
    console.log('error');
  }

  attachedCallback () {
    console.log("I was called");
    invariant(!!this.hasAttribute('src'), 'campaign-product-shot component requires a src');
    fetch(this.getAttribute('src'))
      .then(filterBadResponse)
      .then(getResponseJSON)
      .then(this.handleRequestSuccess.bind(this))
      .catch(this.handleRequestError);
  }

  detachedCallback () {
    console.log('Detached campaign-product-shot');
  }

  attributeChangedCallback (name, previousValue, value) {
    if (name === 'src' && previousValue !== value) {
      this.attachedCallback();
    }

    console.log(
      'Attribute Changed campaign-product-shot changed ${name} from: ',
      previousValue, 'to:', value
    );
  }
}

registerElement('campaign-product-shot', CampaignProductShot);

export default CampaignProductShot;
