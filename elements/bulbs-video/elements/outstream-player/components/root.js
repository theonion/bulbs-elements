import React, { PropTypes } from 'react';

import Revealed from '../../../components/revealed';

export default class Root extends React.Component {

  render () {
    if (!this.props.video) {
      return <div/>;
    }

    return (
      <div className='outstream-player' data-track-category='outstream-player'>

        <div className='outstream-player-video bulbs-video-outstream-player'>
          <Revealed
            disableSharing={true}
            muted={true}
            creativeSize='400x300'
            targetHostChannel='outstream'
            defaultCaptions={true}
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

Root.displayName = 'OutstreamPlayerRoot';

Root.propTypes = {
  video: PropTypes.object,
};
