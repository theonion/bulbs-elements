import React, { PropTypes } from 'react';
import VideoPlayButton from 'bulbs-elements/components/video-play-button';

export default function Cover (props) {
  let { video, actions, displayTitle } = props;
  let imageId = parseInt(video.poster_url.match(/\d+/)[0], 10);
  let titleElement = null;
  if (displayTitle) {
    titleElement = <h1 className='bulbs-video-text'>{video.title}</h1>;
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
        { titleElement }
      </div>
    </div>
  );
}

Cover.propTypes = {
  actions: PropTypes.object.isRequired,
  coverText: PropTypes.string,
  video: PropTypes.object.isRequired,
};
