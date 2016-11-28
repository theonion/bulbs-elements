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
  console.log('VideoSummaryView');

  return (
    <div className='bulbs-video-summary'>
      <div className='bulbs-video-poster'>
        <img src={video.poster_url}/>
        <div className='bulbs-video-shade'/>
        { nowPlaying }
        <VideoPlayButton/>
      </div>
      <h2 className='bulbs-video-series-name'>
        {video.series_name || video.channel_name}
      </h2>
      <bulbs-ellipsize class='bulbs-video-summary-title' line-count='3'>
        {video.title}
      </bulbs-ellipsize>
      <bulbs-video
        src={props.videoSrc}
        no-cover
      />
    </div>
  );
}

VideoSummaryView.displayName = 'VideoSummaryView';

VideoSummaryView.propTypes = {
  nowPlaying: PropTypes.bool.isRequired,
  video: PropTypes.object,
  videoSrc: PropTypes.string,
};

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
        videoSrc={this.props.src}
        video={this.state.video}
        nowPlaying={typeof this.props.nowPlaying === 'string'}
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
    nowPlaying: PropTypes.string,
  },
});

registerReactElement('bulbs-video-summary', VideoSummary);
