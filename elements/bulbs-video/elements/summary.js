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

  let campaign;
  if (video.tunic_campaign_url) {
    campaign = (
      <campaign-display
          data-something={'whatever'}
          data-track-action={props.campaignTrackAction}   // eslint-disable-line react/prop-types
          placement={props.campaignPlacement}             // eslint-disable-line react/prop-types
          preamble-text={props.campaignPreamble}          // eslint-disable-line react/prop-types
          src={video.tunic_campaign_url}
          name-only
      />
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
      <h2 className='bulbs-video-series-name'>
        {video.series_name || video.channel_name}
      </h2>

      {campaign}

      <bulbs-ellipsize class='bulbs-video-summary-title' line-count='3'>
        {video.title}
      </bulbs-ellipsize>
    </div>
  );
}

VideoSummaryView.displayName = 'VideoSummaryView';

VideoSummaryView.propTypes = {
  nowPlaying: PropTypes.bool,
  video: PropTypes.object,
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
        video={this.state.video}
        campaignPlacement={this.props.campaignPlacement}
        campaignPreamble={this.props.campaignPreamble}
        campaignTrackAction={this.props.campaignTrackAction}
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
    campaignPlacement: PropTypes.string,
    campaignPreamble: PropTypes.string,
    campaignTrackAction: PropTypes.string,
    nowPlaying: PropTypes.string,
  },
});

registerReactElement('bulbs-video-summary', VideoSummary);
