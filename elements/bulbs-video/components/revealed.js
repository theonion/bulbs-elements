/* global jQuery, videojs, VideoPlayer */

import React, { PropTypes } from 'react';
import invariant from 'invariant';
import VideoPlayer from 'videohub-player';

window.AnalyticsManager = {
  sendEvent() {
    // no-op
  },
};

window.ga = () => {}
export default class Revealed extends React.Component {
  componentDidMount () {
    invariant(jQuery, '<bulbs-video> requires jQuery to be in global scope.');
    let player = new VideoPlayer(this.refs.video);
  }

  render () {
    let { data } = this.props;
    return (
      <div className='bulbs-video-viewport'>
        <video
          controls
          ref='video'
          className='bulbs-video-video'
        >
          {
            data.sources.data.map((source) => {
              return (
                <source
                  src={source.url}
                  type={source.content_type}
                />
              );
            })
          }
        </video>
      </div>
    );
  }
}

Revealed.propTypes = {
  data: PropTypes.object.isRequired,
};
