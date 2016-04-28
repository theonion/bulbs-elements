import React, { Component, PropTypes } from 'react';
import CroppedImage from 'bulbs-elements/components/cropped-image';

export default class Logo extends Component {
  shouldWrapWithLink() {
    if (typeof this.props.noLink !== 'undefined') {
      return false;
    }
    return !!this.props.clickthrough_url;
  }

  render() {
    let image = <CroppedImage crop={this.props.crop} imageId={this.props.image_id}/>;
    let link = <a href={this.props.clickthrough_url}>{image}</a>;

    return <div className='campaign-display-logo'>{ this.shouldWrapWithLink() ? link : image }</div>;
  }
}

Logo.propTypes = {
  clickthrough_url: PropTypes.string,
  crop: PropTypes.string,
  image_id: PropTypes.number.isRequired,
};
