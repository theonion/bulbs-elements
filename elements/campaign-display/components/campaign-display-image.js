import React, { PropTypes } from 'react';

export default function CampaignDisplayImage (props) {
  return (
    <div className='campaign-display-image'>
      <a href={props.clickthrough_url}>
        <img src={props.image_url} alt={props.name} />
      </a>
    </div>);
}

CampaignDisplayImage.propTypes = {
  clickthrough_url: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
