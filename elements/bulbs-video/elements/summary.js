import React, { PropTypes } from 'react'; // eslint-disable-line
import { registerReactElement } from 'bulbs-elements/register';
import BulbsElement from 'bulbs-elements/bulbs-element';
import VideoPlayButton from 'bulbs-elements/components/video-play-button';

import './summary.scss';

import VideoField from '../fields/video';
import VideoRequest from '../fields/video-request';

export function VideoSummaryView (props) {
  if (!props.video) {
    return <div/>;
  }

  let { video } = props;

  let nowPlaying;
  if (props.nowPlaying) {
    nowPlaying = (
      <div className='bulbs-video-summary-playing'>
        Now Playing
      </div>
    );
  }

  return (
    <div className='bulbs-video-summary'>
      <div className='bulbs-video-poster'>
        <img src={video.poster_url}/>
        <div className='bulbs-video-shade'/>
        { nowPlaying }
        <VideoPlayButton/>
      </div>
      <h3 className='bulbs-video-summary-title'>
        {video.title}
      </h3>
    </div>
  );
}

export default class VideoSummary extends BulbsElement {
  initialDispatch () {
    this.store.actions.fetchVideo(this.props.src);
  }

  componentDidUpdate (props) {
    if (this.props.src !== props.src) {
      this.store.actions.fetchVideo(props.src);
    }
  }

  render () {
    return (
      <VideoSummaryView
        video={this.state.video}
        nowPlaying={this.props.nowPlaying}
      />
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
