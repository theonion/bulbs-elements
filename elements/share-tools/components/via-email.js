import React, { PropTypes } from 'react';
import ShareTool from './share-tool';

export default class ShareViaEmail extends ShareTool {
	render (event) {
		let emailUrl = `mailto:subject=${encodeURIComponent(this.shareTitle)}&body=${this.shareUrl} %0D%0A%0D%0Avia theonion.com`;
		return (
      <ShareButton
        className='share-via-email'
        href={emailUrl}
        data-track-label='Email'
        iconClassName='fa fa-envelope'
        icon={this.props.icon}
        label={this.props.label}
        labelText="Email"
      >
		);
	}
}

ShareViaEmail.proptTypes = Object.extend({}, ShareTool.proptTypes, {
  message: PropTypes.string.isRequired,
});
