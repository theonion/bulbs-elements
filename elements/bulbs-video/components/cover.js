import React, { PropTypes } from 'react';
import CroppedImage from 'bulbs-elements/components/cropped-image';
import VideoPlayButton from 'bulbs-elements/components/video-play-button'

export default function Cover (props) {
  let { video, actions } = props;
  let imageId = parseInt(video.poster_url.match(/\d+/)[0], 10);

  return (
    <div
      className='bulbs-video-cover'
      onClick={actions.revealPlayer}
    >
      <VideoPlayButton/>
      <CroppedImage
        className='bulbs-video-poster'
        imageId={imageId}
        src={video.poster_url}
      />
    </div>
  );
}

Cover.propTypes = {
  actions: PropTypes.object.isRequired,
  video: PropTypes.object.isRequired,
};
