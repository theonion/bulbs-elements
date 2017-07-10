import React from 'react';

import BulbsElement from 'bulbs-elements/bulbs-element';
import { registerReactElement } from 'bulbs-elements/register-react';
import VideoPlayButton from 'bulbs-elements/components/video-play-button';

export default class BulbsVideoPlayButton extends BulbsElement {
  render () {
    return <VideoPlayButton/>;
  }
}

Object.assign(BulbsVideoPlayButton, {
  displayName: 'VideoPlayButton',
});

registerReactElement('bulbs-video-play-button', BulbsVideoPlayButton);
