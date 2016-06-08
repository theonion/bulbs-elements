import React, { PropTypes } from 'react';

let doPicturefill = function (component) {
  window.picturefill(component.refs.image);
};

export default class CroppedImage extends React.Component {
  componentDidMount () {
    // check if window.picturefill is available at mount time, otherwise wait
    // until the document is loaded, and hopefully image.js is loaded, and try
    // window.picturefill again
    if (typeof window.picturefill === 'function') {
      doPicturefill(this);
    }
    else {
      window.addEventListener('load', doPicturefill(this));
    }
  }

  render () {
    let { imageId, className } = this.props;
    let crop = this.props.crop || 'original';
    return (
      <div
        className={className}
        ref='image'
        data-type='image'
        data-image-id={imageId}
        data-crop={crop}
      >
        <div/>
      </div>
    );
  }
}

CroppedImage.propTypes = {
  className: PropTypes.string,
  crop: PropTypes.string,
  imageId: PropTypes.number,
};
