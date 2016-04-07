import React, { PropTypes } from 'react';

import BulbsElement from 'bulbs-elements/bulbs-element';
import { registerReactElement } from 'bulbs-elements/register';

import './campaign-display.scss';

import CampaignDisplaySchema from './campaign-display-schema';
import CampaignDisplayRoot from './components/campaign-display-root';

class CampaignDisplay extends BulbsElement {
  initialDispatch () {
    this.store.actions.fetchCampaign(this.props.campaignUrl);
  }

  render () {
    return (
      <CampaignDisplayRoot
          data={this.state}
          display={this.props.display}
      />
    );
  }
}

CampaignDisplay.displayName = 'CampaignDisplay';

CampaignDisplay.schema = CampaignDisplaySchema;

CampaignDisplay.propTypes = {
  campaignUrl: PropTypes.string.isRequired,
  display: PropTypes.oneOf(['image', 'name']).isRequired,
};

registerReactElement('campaign-display', CampaignDisplay);

export default CampaignDisplay;
export const displayPropType = CampaignDisplay.propTypes.display;
