import React, { PropTypes } from 'react';

export default function Logo (props) {
  let crop = props.crop || 'original';
  let hasUrl = !!props.clickthrough_url;
  let image = <div data-type="image" data-image-id={props.image_id} data-crop={crop}></div>;
  let link = <a href={props.clickthrough_url}>{image}</a>;
  return hasUrl ? link : image;
}

Logo.propTypes = {
  clickthrough_url: PropTypes.string,
  crop: PropTypes.string,
  image_id: PropTypes.number.isRequired,
};
