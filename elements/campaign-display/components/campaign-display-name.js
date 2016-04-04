import React, { PropTypes } from 'react';

export default function CampaignDisplayName (props) {
  return (
    <div className='campaign-display-name'>
      {props.name}
    </div>
  );
}

CampaignDisplayName.propTypes = {
  name: PropTypes.string.isRequired,
};
