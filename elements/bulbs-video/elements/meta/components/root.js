import React, { PropTypes } from 'react';

import VideoMetaCampaign from './campaign';

export default function VideoMetaRoot (props) {
  if (!props.video) {
    return <div/>;
  }

  return (
    <div className='bulbs-video-meta'>
      <div className='bulbs-video-meta-copy'>
        <a
          href={props.video.series_url || props.video.channel_url}
          data-track-action={props.titleTrackAction}
          data-track-label={props.video.series_name || props.video.channel_name}
        >
          <h2 className='bulbs-video-meta-series-name'>
            {props.video.series_name || props.video.channel_name}
          </h2>
        </a>

        { props.campaignUrl ? <VideoMetaCampaign {...props}/> : null }

        <h1 className='bulbs-video-meta-title'>
          {props.video.title}
        </h1>
      </div>
    </div>
  );
}

VideoMetaRoot.displayName = 'VideoMetaRoot';

VideoMetaRoot.propTypes = {
  campaignPlacement: PropTypes.string,
  campaignPreamble: PropTypes.string,
  campaignTrackAction: PropTypes.string,
  campaignUrl: PropTypes.string,
  titleTrackAction: PropTypes.string.isRequired,
  video: PropTypes.object,
};
