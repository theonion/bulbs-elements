import React, { PropTypes } from 'react';

import Revealed from '../../../components/revealed';

import RailPlayerHeader from './header';
import RailPlayerCampaign from './campaign';

export default class Root extends React.Component {
  render () {
    if (!this.props.video) {
      return <div/>;
    }

    return (
      <div className='rail-player'>
        <div className='rail-player-header'>
          <RailPlayerHeader {...this.props}/>

          <a
            className='rail-player-recirc-link'
            target='_blank'
            href={this.props.recircUrl}
          >
            Watch More
          </a>
        </div>

        <div className='rail-player-video bulbs-video-root player'>
          <Revealed
            disableSharing={true}
            muted={true}
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
  video: PropTypes.object,
};
