// Expose jwplayer on the global context
require('expose?jwplayer!../plugins/jwplayer');

import GoogleAnalytics from '../plugins/google-analytics';
import Comscore from '../plugins/comscore';
import { prepGaEventTracker } from 'bulbs-elements/util';

/* global jQuery, ga, AnalyticsManager, BULBS_ELEMENTS_ONIONSTUDIOS_GA_ID */

import React, { PropTypes } from 'react';
import invariant from 'invariant';

// FIXME: where should this be defined? Per-app?
//  Or in some better sort of settings file here?
global.BULBS_ELEMENTS_ONIONSTUDIOS_GA_ID = 'UA-223393-14';
global.BULBS_ELEMENTS_COMSCORE_ID = '6036328';

let jwPlayerIdCounter = 0;

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

    let targeting = this.props.video.targeting;
    let hostChannel = this.props.targetHostChannel || 'main';
    let specialCoverage = this.props.targetSpecialCoverage || 'None';
    let filteredTags = [];

    let dimensions = {
      'dimension1': targeting.target_channel || 'None',
      'dimension2': targeting.target_series || 'None',
      'dimension3': targeting.target_season || 'None',
      'dimension4': targeting.target_video_id || 'None',
      'dimension5': hostChannel,
      'dimension6': specialCoverage,
      'dimension7': true, // 'has_player' from old embed
      'dimension8': this.props.autoplay || 'None', // autoplay
      'dimension9': this.props.targetCampaignId || 'None', // Tunic Campaign
      'dimension10': 'None', // Platform
    };
    let gaTrackerAction = prepGaEventTracker(
      'videoplayer',
      BULBS_ELEMENTS_ONIONSTUDIOS_GA_ID,
      dimensions
    );

    // Making assignment copies here so we can mutate object structure.
    let videoMeta = Object.assign({}, this.props.video);
    videoMeta.hostChannel = hostChannel;
    videoMeta.gaTrackerAction = gaTrackerAction;
    videoMeta.player_options.shareUrl = `${window.location.href}/v/${videoMeta.id}`;

    filteredTags.push(hostChannel);

    if (specialCoverage !== 'None') {
      filteredTags.push(specialCoverage);
    }

    if (this.props.targetCampaignNumber) {
      filteredTags.push(this.props.targetCampaignNumber);
    }

    if (this.props.targetCampaignId) {
      filteredTags.push(`campaign-${this.props.targetCampaignId}`);
    }

    this.props.video.tags.forEach(function (tag) {
      // Temporary until videojs_options completely removed from Onion Studios
      if (tag !== 'main') {
        filteredTags.push(tag);
      }
    });

    videoMeta.tags = filteredTags;

    if (this.props.muted) {
      videoMeta.player_options.muted = true;
    }

    if (this.props.defaultCaptions) {
      videoMeta.player_options.defaultCaptions = true;
    }

    videoMeta.player_options.embedded = this.props.embedded;

    this.makeVideoPlayer(this.refs.videoContainer, videoMeta);
  }

  extractSources (sources) {
    let sourceMap = {};
    let extractedSources = [];

    sources.forEach(function (source) {
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

  vastTest (searchString) { // eslint-disable-line consistent-return
    if (searchString !== '') {
      let vastId = this.parseParam('xgid', searchString);

      if (vastId) {
        return vastId;
      }
    }

    return false;
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
    let hostChannel = videoMeta.hostChannel;
    let channel = videoMeta.channel_slug;
    let series = videoMeta.series_slug;
    let category = `${hostChannel}/${channel}`;
    if (series) {
      category += `/${series}`;
    }
    baseUrl += '&s=' + category;
    baseUrl += '&rnd=' + this.cacheBuster();

    if (vastTestId) {
      baseUrl += '&xgid=' + vastTestId;
    }

    return baseUrl;
  }

  extractTrackCaptions (sources, defaultCaptions) {
    let captions = [];

    sources.forEach(function (source) {
      if (source.content_type === 'text/vtt') {
        captions.push({
          file: source.url,
          label: 'English',
          kind: 'captions',
          default: defaultCaptions || false,
        });
      }
    });

    return captions;
  }

  makeVideoPlayer (element, videoMeta) {
    element.id = `jw-player-${jwPlayerIdCounter++}`;
    this.player = global.jwplayer(element);

    this.player.videoMeta = videoMeta;

    let playerOptions = {
      key: 'qh5iU62Pyc0P3L4gpOdmw+k4sTpmhl2AURmXpA==',
      skin: {
        name: 'onion',
      },
      sources: this.extractSources(videoMeta.sources),
      image: videoMeta.player_options.poster,
      flashplayer: '//ssl.p.jwpcdn.com/player/v/7.4.3/jwplayer.flash.swf',
      aspectratio: '16:9',
      autostart: this.props.controller.revealed,
      hlshtml: true,
      mute: videoMeta.player_options.muted || false,
      preload: 'none',
      primary: 'html5',
      width: '100%',
      controls: !this.props.hideControls,
    };

    if (!videoMeta.player_options.embedded) {
      playerOptions.advertising = {
        client: 'vast',
        tag: this.vastUrl(videoMeta),
        skipoffset: 5,
        vpaidmode: 'insecure',
      };
    }

    let tracks = this.extractTrackCaptions(videoMeta.sources, videoMeta.player_options.defaultCaptions);
    if (tracks.length > 0) {
      playerOptions.tracks = tracks;
    }

    if (!this.props.disableSharing) {
      playerOptions.sharing = {
        link: videoMeta.player_options.shareUrl,
        code: videoMeta.player_options.embedCode,
      };
    }

    this.player.setup(playerOptions);

    GoogleAnalytics.init(this.player, videoMeta.gaPrefix);
    Comscore.init(this.player, global.BULBS_ELEMENTS_COMSCORE_ID, videoMeta.player_options.comscore.metadata);

    this.player.on('beforePlay', () => {
      let videoEl = this.player.getContainer().querySelector('video');
      if (videoEl && this.props.playsInline) {
        videoEl.setAttribute('webkit-playsinline', true);
        videoEl.setAttribute('playsinline', true);
      }
    });
  }

  handleClick () {
    if (this.props.hideControls) {
      this.player.play();
    }
  }

  render () {
    return (
      <div
        className='bulbs-video-viewport'
        onClick={event => this.handleClick(event)}
        onTouchTap={event => this.handleClick(event)}
      >
        <div className='bulbs-video-video video-container' ref='videoContainer'>
        </div>
      </div>
    );
  }
}

Revealed.propTypes = {
  autoplay: PropTypes.bool,
  autoplayNext: PropTypes.bool,
  controller: PropTypes.object.isRequired,
  defaultCaptions: PropTypes.bool,
  disableSharing: PropTypes.bool,
  embedded: PropTypes.bool,
  hideControls: PropTypes.bool,
  muted: PropTypes.bool,
  noEndcard: PropTypes.bool,
  playsInline: PropTypes.bool,
  targetCampaignId: PropTypes.string,
  targetCampaignNumber: PropTypes.string,
  targetHostChannel: PropTypes.string,
  targetSpecialCoverage: PropTypes.string,
  twitterHandle: PropTypes.string,
  video: PropTypes.object.isRequired,
};
