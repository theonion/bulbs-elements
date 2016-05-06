import React, { PropTypes } from 'react';
import ShareTool from './share-tool';

const FB_BASE = 'https://www.facebook.com/sharer/sharer.php?u=';

export default class ShareViaFacebook extends ShareTool {
	share () {
    window.open(FB_BASE + this.shareUrl, 'facebook-share', 'width=580,height=296');

		// Jamie is this neccessary? The data-track-* attributes appear to be set correctly.
    window.onionan.sendEvent({
      eventCategory: $(this).closest('.share-tools').attr('data-track-category'),
      eventAction: $(this).closest('.share-tools').attr('data-track-action'),
      eventLabel: 'Facebook'
    });
    return false;
	}

	render () {
		return (
			<a
				className='share-via-facebook'
				href='#'
				data-track-label='Facebook'
				onClick={this.share}
			>
        { this.props.icon && <i className='fa fa-facebook'/> }
        { this.props.label && <span>Share</span> }
			</a>
		);
	}
}

ShareViaTwitter.proptTypes = Object.extend({}, ShareTool.proptTypes, {

});
