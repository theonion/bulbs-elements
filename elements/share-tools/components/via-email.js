/* global BULBS_ELEMENTS_ANALYTICS_MANAGER */

import React, { PropTypes } from 'react';
import ShareTool from './share-tool';

import ShareButton from './share-button';

export default class ShareViaEmail extends ShareTool {
  constructor (props) {
    super(props);
    this.share = this.share.bind(this);
  }

  share (event) {
    event.preventDefault();
    let emailUrl = `mailto:?subject=${encodeURIComponent(this.shareTitle)}&body=${this.shareUrl} %0D%0A%0D%0A${this.props.message}`;
    window.open(emailUrl, 'email-share', 'width=580,height=300');
  }

  render () {
    return (
      <ShareButton
        className='share-via-email'
        dataTrackLabel='Email'
        iconClassName='fa fa-envelope'
        icon={this.hasIcon()}
        label={this.hasLabel()}
        labelText='Email'
        onClick={this.share}
      />
    );
  }
}

ShareViaEmail.propTypes = Object.assign({}, ShareTool.propTypes, {
  message: PropTypes.string.isRequired,
});
