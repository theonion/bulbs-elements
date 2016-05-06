import React, { PropTypes } from 'react';
import ShareTool from './share-tool';

const TWITTER_BASE = 'http://twitter.com/share?'

export default class ShareViaTwitter extends ShareTool {
	share () {
		window.open(
      TWITTER_BASE + 'text=' + this.shareTitles +
      '&url=' + 'http://' +
      encodeURIComponent(
        this.shareUrl + '&via=theonion&source=webclient'
      ),
      'twitter-share',
      'width=550,height=235');
	}

	render () {
		return (
			<a
				className='share-via-twitter'
				href='#'
				data-track-label='Twitter'
				onClick={this.share}
			>
        { this.props.icon && <i className='fa fa-twitter'/> }
        { this.props.label && <span>Share</span> }
			</a>
		);
	}
}

ShareViaTwitter.propTypes = Object.extend({}, ShareTool.proptTypes, {
  handle: PropTypes.string.isRequired,
});
