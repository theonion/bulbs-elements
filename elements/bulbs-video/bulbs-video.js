import React, { PropTypes } from 'react';
import {
  registerReactElement,
} from 'bulbs-elements/register';
import BulbsElement from 'bulbs-elements/bulbs-element';

import VideoSchema from './bulbs-video-schema';

import BulbsVideoRoot from './components/root';

import './bulbs-video.scss';

const ONION_STUDIOS_URL = process.env.ONION_STUDIOS_URL;

class BulbsVideo extends BulbsElement {
  initialDispatch () {
    this.fetchVideoData(this.props.videoId);
  }

  willReceiveProps (props) {
    // Prop Will Change
    if (this.props.videoId !== props.videoId) {
      this.fetchVideoIdeoData(props.videoId);
    }
  }

  fetchVideoData (videoId) {
    let videoDataUrl = `${ONION_STUDIOS_URL}/video/${videoId}.json`;
    let videoSourcesUrl = `${ONION_STUDIOS_URL}/video/${videoId}/sources`;
    this.store.actions.fetchVideoData(videoDataUrl);
    this.store.actions.fetchSources(videoSourcesUrl);
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
  videoId: PropTypes.string.isRequired,
};

registerReactElement('bulbs-video', BulbsVideo);

export default BulbsVideo;
