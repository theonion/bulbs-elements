import React, { PropTypes } from 'react';
import { registerReactElement } from 'bulbs-elements/register';
import BulbsElement from 'bulbs-elements/bulbs-element';
import VideoPlayButton from 'bulbs-elements/components/video-play-button';
import CroppedImage from 'bulbs-elements/components/cropped-image';

import VideoField from '../fields/video';
import VideoRequest from '../fields/video-request';

export default class VideoSummary extends BulbsElement {
  initialDispatch () {
    this.store.actions.fetchVideo(this.props.src);
  }

  componentWillReceiveProps (props) {
    if (this.props.src !== props.src) {
      this.store.actions.fetchVideo(props.src);
    }
  }

  render () {

    if (!this.state.video) {
      return <div/>;
    }
    let { video } = this.state;
    let imageId = parseInt(video.poster_url.match(/\d+/)[0], 10);
    return (
      <div className='bulbs-video-summary'>
        <div
          className='bulbs-video-poster'
          style={{position: 'relative'}}
        >
          <img
            style={{maxWidth: '100%'}}
            src={video.poster_url}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            boxShadow: 'rgba(0,0,0,0.45) 0px 0px 100px 0px inset',
          }}/>
        </div>
        <div className='bulbs-video-summary-title'>
          {this.state.video.title}
        </div>
        <div className='bulbs-video-summary-playing'>
          Now Playing
        </div>
        <VideoPlayButton/>
      </div>
    );
  }
}

Object.assign(VideoSummary, {
	displayName: 'BulbsVideoSummary',
	schema: {
		video: VideoField,
		videoRequest: VideoRequest,
	},
	propTypes: {
	},
});

registerReactElement('bulbs-video-summary', VideoSummary);
