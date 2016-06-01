import GoogleAnalytics from '../plugins/google-analytics';

/* global jQuery, ga, AnalyticsManager, BULBS_ELEMENTS_ONIONSTUDIOS_GA_ID */

setImmediate(() => {
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
});

import React, { PropTypes } from 'react';
import invariant from 'invariant';

// FIXME: where should this be defined? Per-app?
//  Or in some better sort of settings file here?
global.BULBS_ELEMENTS_ONIONSTUDIOS_GA_ID = 'UA-223393-14';

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
      global.BULBS_ELEMENTS_ONIONSTUDIOS_GA_ID,
      '`<bulbs-video>` requires `BULBS_ELEMENTS_ONIONSTUDIOS_GA_ID` to be in global scope.'
    );
    invariant(
      global.jwplayer,
      '`<bulbs-video>` requires `jwplayer` to be in global scope.'
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
    ga(prefixedSet, 'dimension6', this.props.targetSpecialCoverage || 'None');
    ga(prefixedSet, 'dimension7', true); // `has_player` from old embed
    ga(prefixedSet, 'dimension8', this.props.autoplay || 'None'); // autoplay
    ga(prefixedSet, 'dimension9', this.props.targetCampaignId || 'None'); // Campaign Number
    ga(prefixedSet, 'dimension10', 'None'); // Platform

    // Making assignment copies here so we can mutate object structure.
    let playerOptions = Object.assign({}, this.props.video.player_options);
    playerOptions.pluginConfig = Object.assign({}, playerOptions.pluginConfig);

    playerOptions.pluginConfig.ga = {
      gaPrefix,
    };

    playerOptions.pluginConfig.sharetools = {
      shareUrl: window.location.href,
    };

    this.makeVideoPlayer(this.refs.videoContainer, playerOptions, this.props.video);
  }

  makeVideoPlayer (element, playerOptions, videoMeta) {
    let player = global.jwplayer(element);

    player.videoMeta = videoMeta;

    player.setup({
      'sources': [
        {
          'file': '//v.theonion.com/onionstudios/video/4023/hls_playlist.m3u8',
        },
      ],
      'image': playerOptions.poster,
      'advertising': {
        'client': 'vast',
        'tag': playerOptions.advertising.tag,
        'skipoffset': 5,
      },
      'hlshtml': true,
      'sharing': {
        'link': playerOptions.pluginConfig.sharetools.shareUrl,
        'code': '<iframe name="embedded" allowfullscreen webkitallowfullscreen mozallowfullscreen frameborder="no" width="480" height="270" scrolling="no" src="http://www.onionstudios.com/embed?id=4023"></iframe>',
      },
    });

    GoogleAnalytics.init(player, playerOptions.pluginConfig.ga.gaPrefix);
  }

  render () {
    let { video } = this.props;
    return (
      <div className='bulbs-video-viewport'>
        <div class='bulbs-video-video video-container' ref='videoContainer'>
        </div>
      </div>
    );
  }
}

Revealed.propTypes = {
  autoplay: PropTypes.bool,
  autoplayNext: PropTypes.bool,
  noEndcard: PropTypes.bool,
  targetCampaignId: PropTypes.string,
  targetSpecialCoverage: PropTypes.string,
  twitterHandle: PropTypes.string,
  video: PropTypes.object.isRequired,
};
