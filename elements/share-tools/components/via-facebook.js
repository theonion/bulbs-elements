/* global BULBS_ELEMENTS_ANALYTICS_MANAGER */

import React from 'react';
import ShareTool from './share-tool';
import ShareButton from './share-button';

const FB_BASE = 'https://www.facebook.com/sharer/sharer.php?u=';

export default class ShareViaFacebook extends ShareTool {
  constructor(props) {
    super(props);
    this.share = this.share.bind(this);
  }

  share(event) {
    event.preventDefault();
    window.open(FB_BASE + this.shareUrl, 'facebook-share', 'width=580,height=296');
  }

  render() {
    return (
      <ShareButton
        className='share-via-facebook'
        dataTrackLabel='Facebook'
        iconClassName='fa fa-facebook'
        icon={this.hasIcon()}
        label={this.hasLabel()}
        labelText='Share'
        onClick={this.share}
      />
    );
  }
}

ShareViaFacebook.propTypes = Object.assign({}, ShareTool.proptTypes, {

});
