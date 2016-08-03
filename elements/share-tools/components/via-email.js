/* global BULBS_ELEMENTS_ANALYTICS_MANAGER */

import React, { PropTypes } from 'react';
import ShareTool from './share-tool';

import ShareButton from './share-button';

export default class ShareViaEmail extends ShareTool {
  render () {
    let emailUrl = `mailto:?subject=${encodeURIComponent(this.shareTitle)}&body=${this.shareUrl} %0D%0A%0D%0A${this.props.message}`; // eslint-disable-line max-len
    return (
      <ShareButton
        className='share-via-email'
        dataTrackLabel='Email'
        iconClassName='fa fa-envelope'
        icon={this.hasIcon()}
        label={this.hasLabel()}
        labelText='Email'
        href={emailUrl}
      />
    );
  }
}

ShareViaEmail.propTypes = Object.assign({}, ShareTool.propTypes, {
  message: PropTypes.string.isRequired,
});
