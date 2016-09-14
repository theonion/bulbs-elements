import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';

class CampaignProductShot extends BulbsHTMLElement {

  handleRequestSuccess (data) {
    this.innerHTML =
      `<div className='campaign-product-shot'>
        <img src='${data.productShotUrl}'>
      </div>`;
  }

  handleRequestError () {
    console.log('error');
  }

  attachedCallback () {
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
