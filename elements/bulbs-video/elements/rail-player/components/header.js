/* eslint-disable react/prop-types */
// This gets identical props as RailPlayerRoot

import React from 'react';
import VideoPlayButton from 'bulbs-elements/components/video-play-button';

export default function RailPlayerHeader (props) {
  if (props.channel && props.channel === props.video.channel_slug) {
    return (
      <img
        className='rail-player-logo'
        src={props.video.channel_logo_url}
        alt={props.video.channel_name}
      />
    );
  }
  return <VideoPlayButton/>;
}

RailPlayerHeader.displayName = 'RailPlayerHeader';
