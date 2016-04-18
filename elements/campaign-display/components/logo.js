import React, { PropTypes } from 'react';

export default class Logo extends React.Component {

  componentDidMount () {
    window.picturefill(this.refs.image);
  }

  render () {
    let crop = this.props.crop || 'original';
    let hasUrl = !!this.props.clickthrough_url;
    let image = <div ref="image" data-type="image" data-image-id={this.props.image_id} data-crop={crop}></div>;
    let link = <a ref="linkWrapper" href={this.props.clickthrough_url}>{image}</a>;

    return hasUrl ? link : image;
  }
}

Logo.propTypes = {
  clickthrough_url: PropTypes.string,
  crop: PropTypes.string,
  image_id: PropTypes.number.isRequired,
};
