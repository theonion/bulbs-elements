import React, { PropTypes } from 'react';

import BulbsElement from 'bulbs-elements/bulbs-element';
import { registerReactElement } from 'bulbs-elements/register';

import './campaign-display.scss';

import CampaignField from './fields/campaign-field';
import CampaignRequest from './fields/campaign-request-field';
import CampaignDisplayRoot from './components/campaign-display-root';

class CampaignDisplay extends BulbsElement {
  constructor (props) {
    if (!props.campaignUrl) {
      throw new Error('campaign-display component requires a campaign url');
    }
    super(props);
  }

  initialDispatch () {
    this.store.actions.fetchCampaign(this.props.campaignUrl);
  }

  render () {
    return (
      <CampaignDisplayRoot
          {...this.state}
          display={this.props.display}
      />
    );
  }
}

Object.assign(CampaignDisplay, {
  displayName: 'CampaignDisplay',
  schema: {
    campaign: CampaignField,
    campaignRequest: CampaignRequest,
  },
  propTypes: {
    campaignUrl: PropTypes.string.isRequired,
    display: PropTypes.oneOf(['image', 'name']).isRequired,
  },
});

registerReactElement('campaign-display', CampaignDisplay);

export default CampaignDisplay;
export const displayPropType = CampaignDisplay.propTypes.display;
