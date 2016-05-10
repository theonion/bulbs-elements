import React, { Component, PropTypes } from 'react';

export default class Logo extends Component {
  render() {
    return (
      <div className='campaign-display-logo'>
        <img src={this.props.image_url} />
      </div>);
  }
}

Logo.propTypes = {
  image_url: PropTypes.string.isRequired,
};
