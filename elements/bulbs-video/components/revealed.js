// Expose jwplayer on the global context
require('expose?jwplayer!../plugins/jwplayer');

import GoogleAnalytics from '../plugins/google-analytics';
import Comscore from '../plugins/comscore';

/* global jQuery, ga, AnalyticsManager, BULBS_ELEMENTS_ONIONSTUDIOS_GA_ID */

import React, { PropTypes } from 'react';
import invariant from 'invariant';

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

    invariant(
      window.isMobile,
      '`<bulbs-video>` requires `isMobile()` to be set on window.'
    );

    invariant(
      window.FREEWHEEL_NETWORK_ID,
      '`<bulbs-video>` requires `FREEWHEEL_NETWORK_ID` to be set on window.'
    );
    let gaPrefix = makeGaPrefix();
    ga('create', BULBS_ELEMENTS_ONIONSTUDIOS_GA_ID, 'auto', { name: gaPrefix });

    let targeting = this.props.video.targeting;
    let prefixedSet = `${gaPrefix}.set`;
    let hostChannel = this.props.targetHostChannel || 'main';
    let specialCoverage = this.props.targetSpecialCoverage || 'None';
    let filteredTags = [];

    ga(prefixedSet, 'dimension1', targeting.target_channel || 'None');
    ga(prefixedSet, 'dimension2', targeting.target_series || 'None');
    ga(prefixedSet, 'dimension3', targeting.target_season || 'None');
    ga(prefixedSet, 'dimension4', targeting.target_video_id || 'None');
    ga(prefixedSet, 'dimension5', hostChannel);
    ga(prefixedSet, 'dimension6', specialCoverage);
    ga(prefixedSet, 'dimension7', true); // `has_player` from old embed
    ga(prefixedSet, 'dimension8', this.props.autoplay || 'None'); // autoplay
    ga(prefixedSet, 'dimension9', this.props.targetCampaignId || 'None'); // Tunic Campaign Id
    ga(prefixedSet, 'dimension10', 'None'); // Platform

    // Making assignment copies here so we can mutate object structure.
    let videoMeta = Object.assign({}, this.props.video);
    videoMeta.hostChannel = hostChannel;
    videoMeta.gaPrefix = gaPrefix;
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

  getProfValue () {
    let prof;
    if (window.isMobile.any) {
      prof = 'theonion_mobileweb_html5';
    }
    else {
      prof = 'theonion_desktop_html5';
    }
    return prof;
  }

  setDeviceAcronym () {
    let deviceAcronym;
    if (window.isMobile.any) {
      deviceAcronym = 'm';
    }
    else {
      deviceAcronym = 'd';
    }
    return deviceAcronym;
  }

  getSiteName () {
    return window.location.host.split('.')[1];
  }

  getDfpSection () {
    let dfpSection;
    if (window.TARGETING.dfp_section) {
      dfpSection = window.TARGETING.dfp_section;
    }
    else if (window.TARGETING.dfp_specialcoverage) {
      let slug = window.TARGETING.dfp_specialcoverage;
      dfpSection = `specialcoverage_${slug}`;
    }
    else {
      dfpSection = 'video';
    }
    return dfpSection;
  }

  buildCsid (hostChannel) {
    // Custom Site Section ID
    // format: <device acronym>.<site name>_<dfp section>_<host channel>
    let deviceAcronym = this.setDeviceAcronym();
    let siteName = this.getSiteName();
    let siteSection = this.getDfpSection();

    return `${deviceAcronym}.${siteName}_${siteSection}_${hostChannel}`;
  }

  buildCaid (videohubReferenceId) {
    // Custom content video asset id
    // format: onion_<videohub reference id>
    return `onion_${videohubReferenceId}`;
  }

  vastUrl (videoMeta) {
    let hostChannel = videoMeta.hostChannel;
    let videohubReferenceId = videoMeta.id;
    let randomVideoPlayerNumber = videoMeta.vprn;
    let vastTestId = this.vastTest(window.location.search);
    let series = videoMeta.series_slug;
    let campaignId = this.props.targetCampaignId;
    let specialCoverage = this.props.targetSpecialCoverage;

    let baseUrl = `http://${window.FREEWHEEL_NETWORK_ID}.v.fwmrm.net/ad/g/1?`;

    // required global params
    baseUrl += 'resp=' + 'vmap1';
    baseUrl += '&prof=' + this.getProfValue();
    baseUrl += '&csid=' + this.buildCsid(hostChannel);
    baseUrl += '&caid=' + this.buildCaid(videohubReferenceId);
    baseUrl += '&pvrn=' + this.cacheBuster();
    baseUrl += '&vprn=' + randomVideoPlayerNumber;

    // optional global param
    if (vastTestId) { baseUrl += '&cana=' + vastTestId; }

    // Key Values
    baseUrl += ';&video_id=' + videohubReferenceId;
    baseUrl += '&channel_slug=' + videoMeta.channel_slug;
    if (series) { baseUrl += '&series_slug=' + series; }
    if (campaignId) { baseUrl += '&campaign_id=' + campaignId; }
    if (specialCoverage) { baseUrl += '&special_coverage=' + specialCoverage; }

    // Slot Params *Required Fields*
    baseUrl += ';&slid=' + 'Preroll';
    baseUrl += '&tpcl=' + 'PREROLL';
    baseUrl += '&ptgt=' + 'a';

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
    element.id = videoMeta.gaPrefix;
    let player = global.jwplayer(element);

    // random video player number ending with video id
    // to be used in vastUrl query string
    let randomVideoPlayerNumber = parseInt(
      `${this.cacheBuster()}${videoMeta.id}`,
      10
    );
    videoMeta.vprn = randomVideoPlayerNumber;

    player.videoMeta = videoMeta;

    let playerOptions = {
      key: 'qh5iU62Pyc0P3L4gpOdmw+k4sTpmhl2AURmXpA==',
      skin: {
        name: 'onion',
      },
      sources: this.extractSources(videoMeta.sources),
      image: videoMeta.player_options.poster,
      flashplayer: '//ssl.p.jwpcdn.com/player/v/7.4.3/jwplayer.flash.swf',
      aspectratio: '16:9',
      autostart: true,
      hlshtml: true,
      mute: videoMeta.player_options.muted || false,
      preload: 'none',
      primary: 'html5',
      width: '100%',
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

    player.setup(playerOptions);

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
  defaultCaptions: PropTypes.bool,
  disableSharing: PropTypes.bool,
  embedded: PropTypes.bool,
  muted: PropTypes.bool,
  noEndcard: PropTypes.bool,
  targetCampaignId: PropTypes.string,
  targetCampaignNumber: PropTypes.string,
  targetHostChannel: PropTypes.string,
  targetSpecialCoverage: PropTypes.string,
  twitterHandle: PropTypes.string,
  video: PropTypes.object.isRequired,
};
