import React, { PropTypes } from 'react';
import VideoPlayButton from 'bulbs-elements/components/video-play-button';

import VideoMetaRoot from '../elements/meta/components/root';

export default function Cover (props) {
  let { video, actions, enablePosterMeta, disableMetaLink, mobileTitle } = props;
  let imageId = parseInt(video.poster_url.match(/\d+/)[0], 10);
  let metaElement;

  if (enablePosterMeta) {
    metaElement = <VideoMetaRoot
                    video={video}
                    disableLink={disableMetaLink}
                    mobileTitle={mobileTitle}/>;
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
        {metaElement}
      </div>
    </div>
  );
}

Cover.propTypes = {
  actions: PropTypes.object.isRequired,
  disableMetaLink: PropTypes.bool,
  enablePosterMeta: PropTypes.bool,
  mobileTitle: PropTypes.string,
  video: PropTypes.object.isRequired,
};
