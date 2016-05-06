import React, { PropTypes } from 'react';
import ShareTool from './share-tool';

const FB_BASE = 'https://www.facebook.com/sharer/sharer.php?u=';

export default class ShareViaFacebook extends ShareTool {
	share (event) {
    event.preventDefault();
    window.open(FB_BASE + this.shareUrl, 'facebook-share', 'width=580,height=296');
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
