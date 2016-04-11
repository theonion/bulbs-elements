import React, { PropTypes } from 'react';

export default function CampaignDisplayImage (props) {
  let image = <img src={props.image_url} alt={props.name} />;
  let hasUrl = !!props.clickthrough_url;
  let link = (
    <a href={props.clickthrough_url}>
      {image}
    </a>);

  return (
    <div className='campaign-display-image'>
      {hasUrl ? link : image}
    </div>);
}

CampaignDisplayImage.propTypes = {
  clickthrough_url: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
