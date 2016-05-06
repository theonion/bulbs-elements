import React, { PropTypes } from 'react';
import ShareTool from './share-tool';

const TWITTER_BASE = 'http://twitter.com/share?'

export default class ShareViaTwitter extends ShareTool {
	share (event) {
    event.preventDefault();
		window.open(
      TWITTER_BASE + 'text=' + this.shareTitles +
      '&url=' + 'http://' +
      encodeURIComponent(
        this.shareUrl + '&via=theonion&source=webclient'
      ),
      'twitter-share',
      'width=550,height=235');
	}
}

ShareViaTwitter.propTypes = Object.assign({}, ShareTool.proptTypes, {
  twitterHandle: PropTypes.string.isRequired,
});
