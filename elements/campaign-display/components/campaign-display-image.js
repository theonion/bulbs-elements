import React, { PropTypes } from 'react';

export default function CampaignDisplayImage (props) {
  return (
    <div className='campaign-display-image'>
      <img src={props.image} />
    </div>);
}

CampaignDisplayImage.propTypes = {
  image: PropTypes.string.isRequired,
};
