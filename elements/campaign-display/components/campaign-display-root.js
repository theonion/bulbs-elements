import React, { PropTypes } from 'react';
import CampaignDisplayName from './campaign-display-name';
import CampaignDisplayImage from './campaign-display-image';

export default function CampaignDisplayRoot (props) {
  let component;
  if (Object.keys(props.campaign).length === 0) {
    component = '';
  }
  else if (props.display === 'name') {
    component = <CampaignDisplayName name={props.campaign.name}/>;
  }
  else if (props.display === 'image') {
    component = <CampaignDisplayImage {...props.campaign} />;
  }

  return (
    <div className='campaign-display-campaign-display-root'>
      {component}
    </div>);
}

CampaignDisplayRoot.propTypes = {
  campaign: PropTypes.object,
  display: PropTypes.oneOf(['image', 'name']).isRequired,
};
