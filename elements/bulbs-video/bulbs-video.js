import React, { PropTypes } from 'react';
import {
  registerReactElement,
} from 'bulbs-elements/register';
import BulbsElement from 'bulbs-elements/bulbs-element';

import VideoStore from './bulbs-video-store';

import BulbsVideoRoot from './components/root';

import './bulbs-video.scss';

//const ONION_STUDIOS_URL = '//www.onionstudios.com';
console.log(process.env.ONION_STUDIOS_URL);
const ONION_STUDIOS_URL = '//videohub.local';

class BulbsVideo extends BulbsElement {
  initialDispatch () {
    this.fetchVideoData(this.props.videoId);
  }

  willRecieveProps (props) {
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

BulbsVideo.store = VideoStore;

BulbsVideo.propTypes = {
  videoId: PropTypes.string.isRequired,
  loop: PropTypes.bool,
  autoplay: PropTypes.bool,
  mute: PropTypes.bool,
};

registerReactElement('bulbs-video', BulbsVideo);

export default BulbsVideo;
