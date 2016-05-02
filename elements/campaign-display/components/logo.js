import React, { Component, PropTypes } from 'react';

export default class Logo extends Component {
  shouldWrapWithLink() {
    if (typeof this.props.noLink !== 'undefined') {
      return false;
    }
    return !!this.props.clickthrough_url;
  }

  render() {
    let image = <img src={this.props.image_url} />;
    let link = <a ref='linkWrapper' href={this.props.clickthrough_url}>{image}</a>;

    return <div className='campaign-display-logo'>{ this.shouldWrapWithLink() ? link : image }</div>;
  }
}

Logo.propTypes = {
  clickthrough_url: PropTypes.string,
  crop: PropTypes.string,
  image_url: PropTypes.string.isRequired,
};
