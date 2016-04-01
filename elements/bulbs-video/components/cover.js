import React, { PropTypes } from 'react';

export default function Cover (props) {
  let { data, actions } = props;
  return (
    <div className='bulbs-video-cover'>
      <button
        onClick={actions.revealPlayer}
      >
        ▶
      </button>
      <img
        className='bulbs-video-poster'
        src={data.video.data.poster_url}
      />
    </div>
  );
}

Cover.propTypes = {

};
