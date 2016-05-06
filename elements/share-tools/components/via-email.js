import React, { PropTypes } from 'react';
import ShareTool from './share-tool';

export default class ShareViaEmail extends ShareTool {
	render () {
		let emailUrl = `mailto:subject=${encodeURIComponent(this.shareTitle)}&body=${this.shareUrl} %0D%0A%0D%0Avia theonion.com`;
		return (
			<a
				className='share-via-email'
				href={emailUrl}
				data-track-label='Email'
			>
				{ this.props.icon && <i className='fa fa-envelope'/> }
        { this.props.label && <span>Email</span> }
			</a>
		);
	}
}

ShareViaEmail.proptTypes = Object.extend({}, ShareTool.proptTypes, {
  message: PropTypes.string.isRequired,
});
