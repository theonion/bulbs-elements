import React, { PropTypes } from 'react';
import ShareTool from './share-tool';
import ShareButton from './share-button';

const TWITTER_BASE = 'http://twitter.com/share?'

export default class ShareViaTwitter extends ShareTool {
	share (event) {
    event.preventDefault();
		window.open(
      TWITTER_BASE +
      'text=' + this.shareTitle + '&url=' + this.shareUrl +
      '&via=' + this.props.twitterHandle + '&source=webclient',
      'twitter-share',
      'width=550,height=235'
    );
	}
  render () {
    return (
      <ShareButton
        className='share-via-twitter'
        data-track-label='Twitter'
        iconClassName='fa fa-twitter'
        icon={this.props.icon}
        labelText='Tweet'
        label={this.props.label}
        onClick={this.share}
      />
    );
  }
}

ShareViaTwitter.propTypes = Object.assign({}, ShareTool.proptTypes, {
  twitterHandle: PropTypes.string.isRequired,
});
