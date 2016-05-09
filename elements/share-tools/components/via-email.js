import React, { PropTypes } from 'react';
import ShareTool from './share-tool';

import ShareButton from './share-button';

export default class ShareViaEmail extends ShareTool {
	render (event) {
		let emailUrl = `mailto:subject=${encodeURIComponent(this.shareTitle)}&body=${this.shareUrl} %0D%0A%0D%0A${this.props.message}`;
		return (
      <ShareButton
        className='share-via-email'
        href={emailUrl}
        dataTrackLabel='Email'
        iconClassName='fa fa-envelope'
        icon={true}
        label={true}
        labelText='Email'
      />
		);
	}
}

ShareViaEmail.propTypes = Object.assign({}, ShareTool.propTypes, {
  message: PropTypes.string.isRequired,
});
