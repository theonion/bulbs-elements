/* global BULBS_ELEMENTS_ANALYTICS_MANAGER */

import React, { PropTypes } from 'react';
import ShareTool from './share-tool';
import ShareButton from './share-button';

const TWITTER_BASE = 'http://twitter.com/share?';

export default class ShareViaTwitter extends ShareTool {
  constructor (props) {
    super(props);
    this.share = this.share.bind(this);
  }

  get twitterHandle () {
    if (this.props.twitterHandle) {
      return this.props.twitterHandle;
    }

    let twitterSiteMeta = document.querySelector("[name='twitter:site']");
    if (twitterSiteMeta) {
      return twitterSiteMeta.content.replace('@', '');
    }

    return null;
  }

  getShareTitle () {
    if (this.shareTitle) {
      return this.shareTitle;
    }

    let metaTitle = document.querySelector("[name='twitter:title']");
    if (metaTitle) {
      return metaTitle.content;
    }

    return this.shareTitle;
  }

  share (event) {
    event.preventDefault();
    window.open(
      TWITTER_BASE +
      'text=' + this.getShareTitle() + '&url=' + this.shareUrl +
      '&via=' + this.twitterHandle + '&source=webclient',
      'twitter-share',
      'width=550,height=235'
    );
  }

  render () {
    return (
      <ShareButton
        className='share-via-twitter'
        dataTrackLabel='Twitter'
        iconClassName='fa fa-twitter'
        icon={this.hasIcon()}
        label={this.hasLabel()}
        labelText='Tweet'
        onClick={this.share}
      />
    );
  }
}

ShareViaTwitter.propTypes = Object.assign({}, ShareTool.propTypes, {
  twitterHandle: PropTypes.string,
});
