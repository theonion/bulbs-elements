import React, { PropTypes } from 'react'; // eslint-disable-line


export function VideoInfo (props) {
  let channelElement;
  let durationElement;
  let titleElement;

  let { channel, duration, title } = props;

  if (channel) {
    channelElement = <h1 className='bulbs-video-channel'>{channel}</h1>
  }

  if ((duration) && (duration !== 0)) {
    durationElement = <h1 className='bulbs-video-duration'>{duration}</h1>
  }

  if (title) {
    titleElement = <h1 className='bulbs-video-title'>{title}</h1>
  }

  return (
    <div className='bulbs-video-text'>
      {channelElement}{durationElement}
      {titleElement}
    </div>
  );
}

VideoInfo.displayName = 'VideoInfo';

VideoInfo.propTypes = {
  channel: PropTypes.string,
  duration: PropTypes.number,
  title: PropTypes.string
}