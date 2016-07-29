/* global BULBS_ELEMENTS_ANALYTICS_MANAGER */

import React from 'react';
import ShareTool from './share-tool';
import ShareButton from './share-button';

export default class CommentViaDisqus extends ShareTool {
  constructor (props) {
    super(props);
    this.share = this.share.bind(this);
  }

  share (event) {
    event.preventDefault();
    if (this.shareUrl === window.location.toString()) {
      window.location.hash = '#comments';
    }
    else {
      window.open(
        this.shareUrl + '#comments'
      );
    }
  }

  render () {
    return (
      <ShareButton
        className='share-via-disqus'
        dataTrackLabel='Disqus'
        iconClassName='fa fa-comments'
        icon={this.hasIcon()}
        label={this.hasLabel()}
        labelText='Disqus'
        onClick={this.share}
      />
    );
  }
}
