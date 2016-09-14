import React, { PropTypes } from 'react';
import { VideoInfo } from './info';
import VideoPlayButton from 'bulbs-elements/components/video-play-button';

export default function Cover (props) {
  let { video, actions, displayChannel, displayDuration, displayTitle } = props;
  let imageId = parseInt(video.poster_url.match(/\d+/)[0], 10);
  let channelElement = null;
  let titleElement = null;

  if (displayChannel === true) {
    channelElement = <h1 className='bulbs-video-channel'>{video.channel_name}</h1>;
  }

  if (displayTitle === true) {
    titleElement = <h1 className='bulbs-video-title'>{video.title}</h1>;
  }

  return (
    <div
      className='bulbs-video-cover'
      data-track-label='#'
      onClick={actions.revealPlayer}
    >
      <img
        className='bulbs-video-poster'
        imageId={imageId}
        src={video.poster_url}
      />
      <div className='bulbs-video-poster-overlay'>
        <VideoPlayButton/>
        <VideoInfo
          channel={video.channel_name}
          duration={video.duration}
          title={video.title}
        />
      </div>
    </div>
  );
}

Cover.propTypes = {
  actions: PropTypes.object.isRequired,
  displayChannel: PropTypes.bool,
  displayDuration: PropTypes.bool,
  displayTitle: PropTypes.bool,
  video: PropTypes.object.isRequired,
};
