import React, { PropTypes } from 'react';

import Revealed from '../../../components/revealed';

import VideoPlayButton from 'bulbs-elements/components/video-play-button';

export function RailPlayerCampaign (props) {
  if (props.video.tunic_campaign_url) {
    return (
      <campaign-display
        class='rail-player-content-sponsorship'
        src={props.video.tunic_campaign_url}
        preamble-text='Sponsored By'
        placement='rail-player'
      />
    );
  }

  return null;
}

export function RailPlayerHeader (props) {
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

export default class Root extends React.Component {
  render () {
    if (!this.props.video) {
      return <div/>;
    }

    return (
      <div className='rail-player'>
        <div className='rail-player-header'>
          <RailPlayerHeader {...this.props}/>

          <div className='rail-player-logo'>
            Video
          </div>

          <a
            className='rail-player-recirc-link'
            target='_blank'
            href={this.props.recircUrl}
          >
            Watch More
          </a>
        </div>

        <div className='rail-player-video bulbs-video-root player'>
          <Revealed disableSharing={true} {...this.props}/>
        </div>

        <div className='rail-player-footer'>
          <RailPlayerCampaign {...this.props}/>

          <div className='rail-player-title'>
            { this.props.video.title }
          </div>
        </div>

      </div>
    );
  }
}

Root.displayName = 'RailPlayerRoot';

Root.propTypes = {
  channel: PropTypes.string,
  recircUrl: PropTypes.string.isRequired,
  video: PropTypes.object,
};
