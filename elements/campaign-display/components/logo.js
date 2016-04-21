import React, { PropTypes } from 'react';
import CroppedImage from 'bulbs-elements/components/cropped-image';

export default function Logo (props) {
  let hasUrl = !!props.clickthrough_url;
  let image = <CroppedImage crop={props.crop} imageId={props.image_id}/>;
  let link = <a ref='linkWrapper' href={props.clickthrough_url}>{image}</a>;

  return <div className='campaign-display-logo'>{ hasUrl ? link : image }</div>;
}

Logo.propTypes = {
  clickthrough_url: PropTypes.string,
  crop: PropTypes.string,
  image_id: PropTypes.number.isRequired,
};
