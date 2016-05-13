import React, { PropTypes } from 'react';
import ShareTool from './share-tool';

import ShareButton from './share-button';

export default class ShareViaEmail extends ShareTool {
  share (event) {
    event.preventDefault();
    let emailUrl = `mailto:?subject=${encodeURIComponent(this.shareTitle)}&body=${this.shareUrl} %0D%0A%0D%0A${this.props.message}`; // eslint-disable-line max-len
    window.open(emailUrl, 'email-share', 'width=580,height=300');
  }

  render () {
    return (
      <ShareButton
        className='share-via-email'
        dataTrackLabel='Email'
        iconClassName='fa fa-envelope'
        icon={this.props.icon}
        label={this.props.label}
        labelText='Email'
        onClick={this.share.bind(this)}
      />
    );
  }
}

ShareViaEmail.propTypes = Object.assign({}, ShareTool.propTypes, {
  message: PropTypes.string.isRequired,
});
