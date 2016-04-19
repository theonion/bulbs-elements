import React, { PropTypes, Component } from 'react';

let doPicturefill = function (component) {
  window.picturefill(component.refs.image);
};

export default class Logo extends Component {

  componentDidMount () {
    // check if window.picturefill is available at mount time, otherwise wait
    //  until the document is loaded, and hopefully image.js is loaded, and try
    //  window.picturefill again
    if (typeof window.picturefill === 'function') {
      doPicturefill(this);
    }
    else {
      window.addEventListener('load', doPicturefill.bind(null, this));
    }
  }

  render () {
    let crop = this.props.crop || 'original';
    let hasUrl = !!this.props.clickthrough_url;
    let image = (
      <div
          ref='image'
          data-type='image'
          data-image-id={this.props.image_id}
          data-crop={crop}>
        <div></div>
      </div>
    );
    let link = <a ref='linkWrapper' href={this.props.clickthrough_url}>{image}</a>;

    return <div className='campaign-display-logo'>{ hasUrl ? link : image }</div>;
  }
}

Logo.propTypes = {
  clickthrough_url: PropTypes.string.isRequired,
  crop: PropTypes.string,
  image_id: PropTypes.number.isRequired,
};
