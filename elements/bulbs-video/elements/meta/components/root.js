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
      <share-tools
        share-title={props.video.title}
        share-url={props.shareUrl || window.location}
        data-track-action={props.shareTrackAction}
      >
        <share-via-facebook label icon/>
        <share-via-twitter label icon twitter-handle={props.shareTwitterHandle}/>
        <share-via-email label icon message={props.shareEmailMessage}/>
      </share-tools>
    </div>
  );
}

VideoMetaRoot.displayName = 'VideoMetaRoot';

VideoMetaRoot.propTypes = {
  campaignPlacement: PropTypes.string,
  campaignPreamble: PropTypes.string,
  campaignTrackAction: PropTypes.string,
  campaignUrl: PropTypes.string,
  shareEmailMessage: PropTypes.string.isRequired,
  shareTrackAction: PropTypes.string.isRequired,
  shareTwitterHandle: PropTypes.string.isRequired,
  shareUrl: PropTypes.string,
  titleTrackAction: PropTypes.string.isRequired,
  video: PropTypes.object,
};
