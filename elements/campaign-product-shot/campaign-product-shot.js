import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';

class CampaignProductShot extends BulbsHTMLElement {
  constructor (props) {
    invariant(!!props.src, 'campaign-product-shot component requires a src');
    super(props);
    this.state = { productShotUrl: '' };
    fetch(this.props.src)
      .then(filterBadResponse)
      .then(getResponseJSON)
      .then(this.handleRequestSuccess.bind(this))
      .catch(this.handleRequestError);

      handleRequestSuccess (data) {
        console.log(data);
        this.setState({ productShotUrl: data.productShotUrl });
      }

      handleRequestError () {
        console.log('error');
      }

      render () {
        return (
          <div className='campaign-product-shot'>
            <img src={this.state.productShotUrl}>
          </div>);
      }
  }

  createdCallback () {
    console.log('Created campaign-product-shot');
  }

  attachedCallback () {
    console.log('Attached campaign-product-shot');
  }

  detachedCallback () {
    console.log('Detached campaign-product-shot');
  }

  attributeChangedCallback (name, previousValue, value) {
    console.log(
      'Attribute Changed campaign-product-shot changed ${name} from: ',
      previousValue, 'to:', value
    );
  }
}

Object.assign(CampaignProductShot, {
  displayName: 'CampaignProductShot',
  propTypes: {
    src: PropTypes.string.isRequired,
  },
});

registerElement('campaign-product-shot', CampaignProductShot);

export default CampaignProductShot;
