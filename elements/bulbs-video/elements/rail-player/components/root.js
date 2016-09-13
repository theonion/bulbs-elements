import React, { PropTypes } from 'react';

import {getAnalyticsManager} from 'bulbs-elements/util';

import Revealed from '../../../components/revealed';

import RailPlayerHeader from './header';
import RailPlayerCampaign from './campaign';

export default class Root extends React.Component {

  handlePlay() {
    getAnalyticsManager().sendEvent({
      eventCategory: 'rMVP',
      eventAction: 'Control: Play',
      eventLabel: '#'
    });
  }

  handlePause() {
    getAnalyticsManager().sendEvent({
      eventCategory: 'rMVP',
      eventAction: 'Control: Pause',
      eventLabel: '#'
    });
  }

  render () {
    if (!this.props.video) {
      return <div/>;
    }

    return (
      <div className='rail-player' data-track-category='rMVP'>
        <div className='rail-player-header'>
          <RailPlayerHeader {...this.props}/>

          <a
            className='rail-player-recirc-link'
            target='_blank'
            data-track-action='Watch More'
            data-track-label={this.props.recircUrl}
            href={this.props.recircUrl}
          >
            Watch More
          </a>
        </div>

        <div className='rail-player-video bulbs-video-root player'>
          <Revealed
            disableSharing={true}
            muted={true}
            onPlay={this.handlePlay.bind(this)}
            onPause={this.handlePause.bind(this)}
            targetHostChannel='right_rail'
            defaultCaptions={true}
            {...this.props}
          />
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
  targetCampaignId: PropTypes.string,
  video: PropTypes.object,
};
