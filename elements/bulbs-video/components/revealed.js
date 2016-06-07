/* global jQuery, ga, AnalyticsManager, BULBS_ELEMENTS_ONIONSTUDIOS_GA_ID */

import React, { PropTypes } from 'react';
import invariant from 'invariant';
import VideoPlayer from 'videohub-player';

// FIXME: where should this be defined? Per-app?
//  Or in some better sort of settings file here?
global.BULBS_ELEMENTS_ONIONSTUDIOS_GA_ID = 'UA-223393-14';

let prefixCount = 0;
function makeGaPrefix() {
  // ga demands tracker names be alphanumeric
  return `videoplayer${prefixCount++}`;
}

export default class Revealed extends React.Component {
  componentDidMount() {
    /*
    FIXME: videohub-player depends on there being an instance of our analytics manager
            at window.AnalyticsManager.
            Some possible solutions:
            1. Have bulbs-video and/or videohub-player initialize their own
               analytics manager
            2. Have bulbs-video and/or videohub-player use a confuration
               such as BULBS_ELEMENTS_ANALYTICS_MANAGER.
            3. Have all sites follow a convention for where AnalyticsManager
               lives.
    */
    /* global avclubAnalytics, onionan, clickholean, starwipe */
    if (window.avclubAnalytics) {
      window.AnalyticsManager = avclubAnalytics;
    }
    else if (window.onionan) {
      window.AnalyticsManager = onionan;
    }
    else if (window.clickholean) {
      window.AnalyticsManager = clickholean;
    }
    else if (window.starwipe) {
      window.AnalyticsManager = starwipe.analyticsManager;
    }

    invariant(
      global.jQuery,
      '`<bulbs-video>` requires `jQuery` to be in global scope.'
    );
    invariant(
      global.ga,
      '`<bulbs-video>` requires `ga` to be in global scope.'
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
    ga(prefixedSet, 'dimension5', this.props.targetHostChannel || 'None');
    ga(prefixedSet, 'dimension6', this.props.targetSpecialCoverage || 'None');
    ga(prefixedSet, 'dimension7', true); // `has_player` from old embed
    ga(prefixedSet, 'dimension8', this.props.autoplay || 'None'); // autoplay
    ga(prefixedSet, 'dimension9', this.props.targetCampaignId || 'None'); // Campaign Number
    ga(prefixedSet, 'dimension10', 'None'); // Platform

    // Making assignment copies here so we can mutate object structure.
    let playerOptions = Object.assign({}, this.props.video.videojs_options);
    playerOptions.pluginConfig = Object.assign({}, playerOptions.pluginConfig);

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
      optional: { flashEnabled: true },
    };

    playerOptions.pluginConfig.sharetools = {
      shareUrl: window.location.href,
      shareTitle: this.props.video.title,
      shareDescription: '',
      twitterHandle: this.props.twitterHandle,
    };

    if (this.props.noEndcard) {
      delete playerOptions.pluginConfig.endcard;
    }

    this.makeVideoPlayer(this.refs.video, playerOptions);
  }

  makeVideoPlayer(element, playerOptions) {
    let player = new VideoPlayer(element, playerOptions);
    player.player.play();
  }

  render() {
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
  autoplay: PropTypes.bool,
  autoplayNext: PropTypes.bool,
  noEndcard: PropTypes.bool,
  targetCampaignId: PropTypes.string,
  targetHostChannel: PropTypes.string,
  targetSpecialCoverage: PropTypes.string,
  twitterHandle: PropTypes.string,
  video: PropTypes.object.isRequired,
};
