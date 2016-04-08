import React, { PropTypes } from 'react';
import CampaignDisplayName from './campaign-display-name';
import CampaignDisplayImage from './campaign-display-image';

export default function CampaignDisplayRoot (props) {
  let component;
  switch (props.display) {
  case 'name':
    component = <CampaignDisplayName name={props.campaign.name}/>;
    break;

  case 'image':
    component = <CampaignDisplayImage {...props.campaign} />;
    break;
  }

  return (
    <div className='campaign-display-campaign-display-root'>
      {component}
    </div>);
}

CampaignDisplayRoot.propTypes = {
  data: PropTypes.object.isRequired,
  display: PropTypes.oneOf(['image', 'name']).isRequired,
};
