import React, { PropTypes } from 'react';

export default function CampaignDisplayImage (props) {
  return (
    <div className='campaign-display-image'>
      <a href={props.url}>
        <img src={props.image} />
      </a>
    </div>);
}

CampaignDisplayImage.propTypes = {
  image: PropTypes.string.isRequired,
};
