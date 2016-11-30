import {
  registerElement,
  BulbsHTMLElement,
} from 'bulbs-elements/register';
import {
  loadOnDemand,
  cachedFetch,
} from 'bulbs-elements/util';
import invariant from 'invariant';

// Expose jwplayer on the global context
//
// The jwplayer.js file calls window.jwplayer = /* HOT JWPLAYER JS */;
require('./plugins/jwplayer');

import GoogleAnalytics from './plugins/google-analytics';
import Comscore from './plugins/comscore';
import { prepGaEventTracker } from 'bulbs-elements/util';

import './bulbs-video.scss';
import './bulbs-video-play-button.scss';
import './player-skin-seven.scss';
import './player-skin-overrides.scss';
import './endcard.scss';
//
// FIXME: where should this be defined? Per-app?
//  Or in some better sort of settings file here?
global.BULBS_ELEMENTS_ONIONSTUDIOS_GA_ID = 'UA-223393-14';
global.BULBS_ELEMENTS_COMSCORE_ID = '6036328';

let jwPlayerIdCounter = 0;

export default class BulbsVideo extends BulbsHTMLElement {
  get props () {
    return {
      autoplayNext: typeof this.getAttribute('twitter-handle') === 'string',
      disableMetaLink: typeof this.getAttribute('disable-meta-link') === 'string',
      disableSharing: typeof this.getAttribute('disable-sharing') === 'string',
      embedded: typeof this.getAttribute('embedded') === 'string',
      enablePosterMeta: typeof this.getAttribute('enable-poster-meta') === 'string',
      hideControls: typeof this.getAttribute('hide-controls') === 'string',
      muted: typeof this.getAttribute('muted') === 'string',
      noCover: typeof this.getAttribute('no-cover') === 'string',
      noEndcard: typeof this.getAttribute('no-endcard') === 'string',
      playsinline: typeof this.getAttribute('playsInline') === 'string',
      targetCampaignId: this.getAttribute('target-campaign-id'),
      targetCampaignNumber: this.getAttribute('target-campaign-number'),
      targetHostChannel: this.getAttribute('target-host-channel'),
      targetSpecialCoverage: this.getAttribute('target-special-coverage'),
      twitterHandle: this.getAttribute('twitter-handle'),
      src: this.getAttribute('src'),
    };
  }

  createdCallback () {
    this.forwardJWEvent = this.forwardJWEvent.bind(this);
    this.setPlaysInline = this.setPlaysInline.bind(this);

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
  }

  attachedCallback () {
    if (!this.player) {
      let posterMeta = '';
      let videoCover = '';

      if (this.props.enablePosterMeta) {
        posterMeta = `
          <bulbs-video-meta
            src=${this.props.src}
            ${this.props.disableMetaLink ? 'disable-link' : ''}
          >
          <bulbs-video-meta/>
        `;
      }

      videoCover = `
        <div
          class='bulbs-video-cover'
          data-track-label='#'
        >
          <div class='bulbs-video-poster-overlay'>
            <bulbs-video-play-button></bulbs-video-play-button>
            ${posterMeta}
          </div>
        </div>
      `;

      this.innerHTML = `
        <div class='bulbs-video-root player'>
          <div class='bulbs-video-viewport'>
            <div class='bulbs-video-video video-container'></div>
          </div>
          ${videoCover}
        </div>
      `;

      this.refs = {
        videoContainer: this.querySelector('.video-container'),
        videoViewport: this.querySelector('.bulbs-video-viewport'),
        videoCover: this.querySelector('.bulbs-video-cover'),
      };

      cachedFetch(this.props.src, { redirect: 'follow' })
        .then(video => this.handleFetchSuccess(video))
        .catch(error => this.handleFetchError(error))
      ;
    }
  }

  handleFetchSuccess (video) {
    let targeting = video.targeting;
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
      global.BULBS_ELEMENTS_ONIONSTUDIOS_GA_ID,
      dimensions
    );

    // Making assignment copies here so we can mutate object structure.
    let videoMeta = Object.assign({}, video);
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

    video.tags.forEach(function (tag) {
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

  forwardJWEvent (event) {
    this.refs.videoViewport.dispatchEvent(new CustomEvent(`jw-${event.type}`));
  }

  setPlaysInline () {
    let videoEl = this.player.getContainer().querySelector('video');
    if (videoEl && this.props.playsInline) {
      videoEl.setAttribute('webkit-playsinline', true);
      videoEl.setAttribute('playsinline', true);
    }
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
      flashplayer: '//ssl.p.jwpcdn.com/player/v/7.7.3/jwplayer.flash.swf',
      aspectratio: '16:9',
      autostart: this.props.autoplay,
      hlshtml: true,
      mute: videoMeta.player_options.muted || false,
      preload: 'none',
      primary: 'html5',
      width: '100%',
      controls: false,
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

    GoogleAnalytics.init(this.player, videoMeta.gaTrackerAction);
    Comscore.init(this.player, global.BULBS_ELEMENTS_COMSCORE_ID, videoMeta.player_options.comscore.metadata);

    this.player.on('beforePlay', this.setPlaysInline);
    this.player.on('complete', this.forwardJWEvent);

    this.refs.videoCover.addEventListener('click', () => this.play());
  }

  detachedCallback () {
    setImmediate(() => {
      if (!document.contains(this)) {
        this.player.remove();
      }
    });
  }

  handleFetchError () {
  }

  play () {
    this.player.play(true);
    this.refs.videoCover.style.display = 'none';
    this.player.setControls(!this.props.hideControls);
  }

  pause () {
    this.player.pause(true);
  }
}

registerElement('bulbs-video', loadOnDemand(BulbsVideo));

import './elements/meta';
import './elements/summary';
import './elements/rail-player';
import './elements/video-carousel';
