import React, { PropTypes } from 'react';
import invariant from 'invariant';

import BulbsElement from 'bulbs-elements/bulbs-element';
import { registerReactElement } from 'bulbs-elements/register';
import VideoPlayButton from 'bulbs-elements/components/video-play-button'

class BulbsVideoPlayButton extends BulbsElement {
  render () {
    return <VideoPlayButton/>
  }
}

Object.assign(BulbsVideoPlayButton, {
  displayName: 'VideoPlayButton',
});

registerReactElement('bulbs-video-play-button', BulbsVideoPlayButton);