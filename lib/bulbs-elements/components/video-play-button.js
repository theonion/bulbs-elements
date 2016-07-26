import React from 'react';

import './video-play-button.scss';

export default function VideoPlayButton () {
  return (
    <svg
      className='bulbs-video-play-button'
      viewBox="0 0 100 100"
    >
      <circle
        className="st0 st1"
        cx="50"
        cy="50"
        r="45.6"
      />
      <path
        className="st1"
        d="M50,97C24.1,97,3,75.9,3,50S24.1,3,50,3s47,21.1,47,47S75.9,97,50,97z
           M50,5.8C25.6,5.8,5.8,25.6,5.8,50
           S25.6,94.2,50,94.2S94.2,74.4,94.2,50S74.4,5.8,50,5.8z"
        />
      <polygon
        className="st1"
        points="36.8,27.8 74.3,51.1 36.6,74.1"
      />
    </svg>
  );
}
