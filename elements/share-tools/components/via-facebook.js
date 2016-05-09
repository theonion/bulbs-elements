import React, { PropTypes } from 'react';
import ShareTool from './share-tool';
import ShareButton from './share-button';

const FB_BASE = 'https://www.facebook.com/sharer/sharer.php?u=';

export default class ShareViaFacebook extends ShareTool {
	share (event) {
    event.preventDefault();
    window.open(FB_BASE + this.shareUrl, 'facebook-share', 'width=580,height=296');
	}

	render () {
		return (
      <ShareButton
        className='share-via-facebook'
        data-track-label='Facebook'
        iconClassName='fa fa-facebook'
        icon={this.props.icon}
        labelText='Share'
        label={this.props.label}
        onClick={this.share}
      />
		);
	}
}

ShareViaFacebook.proptTypes = Object.assign({}, ShareTool.proptTypes, {

});
