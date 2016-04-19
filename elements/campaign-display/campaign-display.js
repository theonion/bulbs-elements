import React, { PropTypes } from 'react';
import invariant from 'invariant';

import BulbsElement from 'bulbs-elements/bulbs-element';
import { registerReactElement } from 'bulbs-elements/register';

import './campaign-display.scss';

import CampaignField from './fields/campaign-field';
import CampaignRequest from './fields/campaign-request-field';
import CampaignDisplayRoot from './components/campaign-display-root';

class CampaignDisplay extends BulbsElement {
  constructor (props) {
    invariant(!!props.src, 'campaign-display component requires a src');
    invariant(!!props.placement, 'campaign-display component requires a placement');
    super(props);
  }

  initialDispatch () {
    this.store.actions.fetchCampaign(this.props.src);
  }

  render () {
    let options = Object.assign({}, this.state, this.props, {
      nameOnly: this.props.nameOnly === '',
      imageOnly: this.props.imageOnly === '',
    });
    return (<CampaignDisplayRoot {...options} />);
  }
}

Object.assign(CampaignDisplay, {
  displayName: 'CampaignDisplay',
  schema: {
    campaign: CampaignField,
    campaignRequest: CampaignRequest,
  },
  propTypes: {
    logoOnly: PropTypes.string,
    nameOnly: PropTypes.string,
    placement: PropTypes.string.isRequired,
    preambleText: PropTypes.string,
    src: PropTypes.string.isRequired,
  },
});

registerReactElement('campaign-display', CampaignDisplay);

export default CampaignDisplay;
export const displayPropType = CampaignDisplay.propTypes.display;
