/* global jQuery, ga, AnalyticsManager, BULBS_ELEMENTS_ONIONSTUDIOS_GA_ID */

setImmediate(() => {
  window.AnalyticsManager = window.avclubAnalytics;
});

import React, { PropTypes } from 'react';
import invariant from 'invariant';
import VideoPlayer from 'videohub-player';

global.BULBS_ELEMENTS_ANALYTICS_MANAGER = {
  sendEvent() {
    // no-op
  },
};

global.ga = () => {};

global.BULBS_ELEMENTS_ONIONSTUDIOS_GA_ID = 'nix';

let prefixCount = 0;
function makeGaPrefix () {
  // ga demands tracker names be alphanumeric
  return `videoplayer${prefixCount++}`;
}

export default class Revealed extends React.Component {
  componentDidMount () {
    invariant(
      global.jQuery,
      '`<bulbs-video>` requires `jQuery` to be in global scope.'
    );
    invariant(
      global.ga,
      '`<bulbs-video>` requires `ga` to be in global scope.'
    );
    invariant(
      global.BULBS_ELEMENTS_ANALYTICS_MANAGER,
      '`<bulbs-video>` requires `BULBS_ELEMENTS_ANALYTICS_MANAGER` to be in global scope.'
    );
    invariant(
      global.BULBS_ELEMENTS_ONIONSTUDIOS_GA_ID,
      '`<bulbs-video>` requires `BULBS_ELEMENTS_ONIONSTUDIOS_GA_ID` to be in global scope.'
    );

    let gaPrefix = makeGaPrefix();
    ga('create', BULBS_ELEMENTS_ONIONSTUDIOS_GA_ID, 'auto', { name: gaPrefix });

    let targeting = this.props.video.targeting;
    let prefixedSet = `${gaPrefix}.set`;

    ga(prefixedSet, 'dimension1', targeting.target_channel || 'None');
    ga(prefixedSet, 'dimension2', targeting.target_series || 'None');
    ga(prefixedSet, 'dimension3', targeting.target_season || 'None');
    ga(prefixedSet, 'dimension4', targeting.target_video_id || 'None');
    ga(prefixedSet, 'dimension5', targeting.target_host_channel || 'None');
    ga(prefixedSet, 'dimension6', targeting.target_special_coverage || 'None');
    ga(prefixedSet, 'dimension7', true); // `has_player` from old embed

    let playerOptions = Object.assign({}, this.props.video.videojs_options);
    playerOptions.pluginConfig.ga = {
      gaPrefix,
      eventCategory: `Video:${targeting.target_channel}`,
      eventLabel: window.location.href,
    };

    playerOptions.pluginConfig.endcard.allowCountdown = !!this.props.autoplayNext;

    playerOptions.pluginConfig.vpbc = {
      vpCategory: this.props.video.category,
      vpFlags: [''],
      tags: this.props.video.tags,
      optional: { flashEnabled: true, },
    };

    new VideoPlayer(this.refs.video, playerOptions); // eslint-disable-line no-new
  }

  render () {
    let { video } = this.props;
    return (
      <div className='bulbs-video-viewport'>
        <video
          controls
          ref='video'
          className='bulbs-video-video video-js vjs-default-skin'
        >
          {
            video.sources.map((source) => {
              return (
                <source
                  key={source.url}
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
  video: PropTypes.object.isRequired,
  autoplayNext: PropTypes.bool,
};
