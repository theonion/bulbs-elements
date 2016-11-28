import React, { PropTypes } from 'react';
import VideoPlayButton from 'bulbs-elements/components/video-play-button';

import VideoMetaRoot from '../elements/meta/components/root';

export default function Cover (props) {
  let { video, actions, enablePosterMeta, disableMetaLink } = props;
  let metaElement;

  if (enablePosterMeta) {
    metaElement = <VideoMetaRoot
                    video={video}
                    disableLink={disableMetaLink}/>;
  }

  return (
    <div
      className='bulbs-video-cover'
      data-track-label='#'
      onClick={actions.revealPlayer}
    >
      <img
        className='bulbs-video-poster'
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
  video: PropTypes.object.isRequired,
};
