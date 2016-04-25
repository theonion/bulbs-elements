import React, { PropTypes } from 'react';
import {
  registerReactElement,
} from 'bulbs-elements/register';
import BulbsElement from 'bulbs-elements/bulbs-element';

import VideoSchema from './bulbs-video-schema';

import BulbsVideoRoot from './components/root';

import './bulbs-video.scss';
import 'videojs/dist/video-js/video-js.css';
import 'videohub-player/dist/videohub-player.css';

class BulbsVideo extends BulbsElement {
  initialDispatch () {
    this.store.actions.fetchVideoData(this.props.src);
  }

  willReceiveProps (props) {
    // Prop Will Change
    if (this.props.src !== props.src) {
      this.store.actions.fetchVideoData(props.src);
    }
  }

  render () {
    return (
      <BulbsVideoRoot
        data={this.state}
        actions={this.store.actions}
      />
    );
  }
}

BulbsVideo.displayName = 'BulbsVideo';

BulbsVideo.schema = VideoSchema;

BulbsVideo.propTypes = {
  autoplay: PropTypes.bool,
  loop: PropTypes.bool,
  mute: PropTypes.bool,
  src: PropTypes.string.isRequired,
};

registerReactElement('bulbs-video', BulbsVideo);

export default BulbsVideo;
