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
          data-track-action={props.campaignTrackAction}
          placement={props.campaignPlacement}
          preamble-text={props.campaignPreamble}
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
  campaignPlacement: PropTypes.string,
  campaignPreamble: PropTypes.string,
  campaignTrackAction: PropTypes.string,
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
    const subProps = {
      nowPlaying: typeof this.props.nowPlaying === 'string',
      video: this.state.video,
    };

    if (this.props.campaignPlacement) {
      subProps.campaignPlacement = this.props.campaignPlacement;
    }

    if (this.props.campaignPreamble) {
      subProps.campaignPreamble = this.props.campaignPreamble;
    }

    if (this.props.campaignTrackAction) {
      subProps.campaignTrackAction = this.props.campaignTrackAction;
    }

    return <VideoSummaryView { ...subProps } />;
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
