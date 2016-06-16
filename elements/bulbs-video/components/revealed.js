// Expose jwplayer on the global context
require('expose?jwplayer!../plugins/jwplayer');

import GoogleAnalytics from '../plugins/google-analytics';
import Comscore from '../plugins/comscore';

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
global.BULBS_ELEMENTS_COMSCORE_ID = '6036328';

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
    let videoMeta = Object.assign({}, this.props.video);
    videoMeta.gaPrefix = gaPrefix;
    videoMeta.player_options.shareUrl = window.location.href;

    this.makeVideoPlayer(this.refs.videoContainer, videoMeta);
  }

  extractSources(sources) {
    let sourceMap = {};
    let extractedSources = [];

    sources.forEach(function(source) {
      sourceMap[source.content_type] = source.url;
    });

    if (sourceMap['application/x-mpegURL']) {
      extractedSources.push({
        file: sourceMap['application/x-mpegURL'],
      });
    }

    if (sourceMap['video/mp4']) {
      extractedSources.push({
        file: sourceMap['video/mp4'],
      });
    }

    return extractedSources;
  }

  cacheBuster () {
    return Math.round(Math.random() * 1.0e+10);
  }

  parseParam (name, queryString) {
    // Properly escape array values in param
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');

    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

    // Grab params from query string
    let results = regex.exec(queryString);
    if (results) {
      results = decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    return results;
  }

  vastTest (searchString) {
    if (searchString !== '') {
      let vastId = this.parseParam('xgid', searchString);

      if (vastId) {
        return vastId;
      }
    }
  }

  vastUrl (videoMeta) {
    let baseUrl = 'http://us-theonion.videoplaza.tv/proxy/distributor/v2?rt=vast_2.0';

    let vastTestId = this.vastTest(window.location.search);

    // AD_TYPE: one of p (preroll), m (midroll), po (postroll), o (overlay)
    baseUrl += '&tt=p';
    videoMeta.tags.push('html5'); // Force HTML 5
    // Tags
    baseUrl += '&t=' + videoMeta.tags;
    //Category
    baseUrl += '&s=' + videoMeta.category;
    baseUrl += '&rnd=' + this.cacheBuster();

    if (vastTestId) {
      baseUrl += '&xgid=' + vastTestId;
    }

    return baseUrl;
  }

  makeVideoPlayer (element, videoMeta) {
    element.id = videoMeta.gaPrefix;
    let player = global.jwplayer(element);

    player.videoMeta = videoMeta;

    player.setup({
      'key': 'qh5iU62Pyc0P3L4gpOdmw+k4sTpmhl2AURmXpA==',
      'skin': {
        'name': 'onion',
      },
      'sources': this.extractSources(videoMeta.sources),
      'image': videoMeta.player_options.poster,
      'advertising': {
        'client': 'vast',
        'tag': this.vastUrl(videoMeta),
        'skipoffset': 5,
        'vpaidmode': 'insecure',
      },
      'flashplayer': '//ssl.p.jwpcdn.com/player/v/7.4.3/jwplayer.flash.swf',
      'aspectratio': '16:9',
      'autostart': true,
      'mute': false,
      'preload': 'none',
      'primary': 'html5',
      'hlshtml': true,
      'width': '100%',
      'sharing': {
        'link': videoMeta.player_options.shareUrl,
        'code': videoMeta.player_options.embedCode,
      },
    });

    GoogleAnalytics.init(player, videoMeta.gaPrefix);
    Comscore.init(player, global.BULBS_ELEMENTS_COMSCORE_ID, videoMeta.player_options.comscore.metadata);
  }

  render () {
    return (
      <div className='bulbs-video-viewport'>
        <div className='bulbs-video-video video-container' ref='videoContainer'>
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
