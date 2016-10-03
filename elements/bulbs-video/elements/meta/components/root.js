import React, { PropTypes } from 'react';

import VideoMetaCampaign from './campaign';

export default function VideoMetaRoot (props) {
  if (!props.video) {
    return <div/>;
  }

  let seriesElement;
  let seriesNameElement = <h2 className='bulbs-video-meta-series-name'>
                    {props.video.series_name || props.video.channel_name}
                  </h2>;

  if (!props.disableLink) {
    seriesElement = <a
            href={props.video.series_url || props.video.channel_url}
            data-track-action={props.titleTrackAction}
            data-track-label={props.video.series_name || props.video.channel_name}
          > {seriesNameElement} </a>;
  }
  else {
    seriesElement = seriesNameElement;
  }

  return (
    <div className='bulbs-video-meta'>
      <div className='bulbs-video-meta-copy'>

        { seriesElement }

        { props.campaignUrl ? <VideoMetaCampaign {...props}/> : null }

        <bulbs-ellipsize class='bulbs-video-meta-title' line-count="3">
          {props.video.title}
        </bulbs-ellipsize>

        <bulbs-ellipsize class='bulbs-video-mobile-title' line-count="3">
          {props.mobileTitle}
        </bulbs-ellipsize>
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
  disableLink: PropTypes.bool,
  mobileTitle: PropTypes.string,
  titleTrackAction: PropTypes.string,
  video: PropTypes.object,
};
