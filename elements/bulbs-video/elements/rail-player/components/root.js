import React, { PropTypes } from 'react';

import Revealed from '../../../components/revealed';

import VideoPlayButton from 'bulbs-elements/components/video-play-button';

export default class Root extends React.Component {
  renderCampaignDisplay () {
    if (this.props.video.tunic_campaign_url) {
      return (
        <campaign-display
          class='rail-player-campaign'
          src={this.props.video.tunic_campaign_url}
          preamble-text='Sponsored By'
          placement='example-runner'
        />
      );
    }

    return null;
  }

  renderHeaderLogo () {
    if (this.props.channel && this.props.channel === this.props.video.channel_slug) {
      return (
        <img
          className='rail-player-logo'
          src={this.props.video.channel_logo_url}
          alt={this.props.video.channel_name}
        />
      );
    }
    return <VideoPlayButton/>;
  }

  render () {
    if (!this.props.video) {
      return <div/>;
    }

    return (
      <div className='rail-player'>

        <div className='rail-player-header'>
          { this.renderHeaderLogo() }
          <div className='rail-player-logo'>
            Video
          </div>

          <a
            className='rail-player-recirc-link'
            target="_blank"
            href={this.props.recircUrl}
          >
            Watch More
          </a>
        </div>

        <div className='rail-player-video bulbs-video-root player'>
          <Revealed disableSharing={true} {...this.props}/>
        </div>

        <div className='rail-player-footer'>
          { this.renderCampaignDisplay() }
          <div className='rail-player-title'>
            { this.props.video.title }
          </div>
        </div>

      </div>
    );
  }
}

Root.propTypes = {
  actions: PropTypes.object.isRequired,
  channel: PropTypes.string,
  muted: PropTypes.bool,
  noEndcard: PropTypes.bool,
  recircUrl: PropTypes.string.isRequired,
  targetCampaignId: PropTypes.string,
  targetHostChannel: PropTypes.string,
  targetSpecialCoverage: PropTypes.string,
  video: PropTypes.object,
};
