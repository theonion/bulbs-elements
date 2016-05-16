import React, { PropTypes } from 'react'; // eslint-disable-line
import { registerReactElement } from 'bulbs-elements/register';
import BulbsElement from 'bulbs-elements/bulbs-element';
import VideoPlayButton from 'bulbs-elements/components/video-play-button';

import './summary.scss';

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
    return (
      <div className='bulbs-video-summary'>
        <div
          className='bulbs-video-poster'
          style={{ position: 'relative' }}
        >
          <img
            style={{ maxWidth: '100%' }}
            src={video.poster_url}
          />
          <div className='bulbs-video-shade'/>
          { typeof this.props.nowPlaying === 'string' &&
            <div className='bulbs-video-summary-playing'>
              Now Playing
            </div>
          }
          <VideoPlayButton/>
        </div>
        <h3 className='bulbs-video-summary-title'>
          {this.state.video.title}
        </h3>
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
    nowPlaying: PropTypes.bool,
  },
});

registerReactElement('bulbs-video-summary', VideoSummary);
