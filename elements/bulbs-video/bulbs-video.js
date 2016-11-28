import React, { PropTypes } from 'react';
import { registerReactElement } from 'bulbs-elements/register';
import BulbsElement from 'bulbs-elements/bulbs-element';
import { loadOnDemand } from 'bulbs-elements/util';

import VideoField from './fields/video';
import VideoRequest from './fields/video-request';
import ControllerField from './fields/controller';

import BulbsVideoRoot from './components/root';

import './bulbs-video.scss';
import './bulbs-video-play-button.scss';
import './player-skin-seven.scss';
import './player-skin-overrides.scss';
import './endcard.scss';

export default class BulbsVideo extends BulbsElement {
  initialDispatch () {
    this.store.actions.fetchVideo(this.props.src);
    if (typeof this.props.autoplay === 'string') {
      this.store.actions.revealPlayer();
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.src !== prevProps.src) {
      setImmediate(() => {
        // We have to do this in the next execution context to work around timing
        // issues with jwplayer and tearing down video players
        this.store.actions.resetController();
        this.store.actions.setVideoField(null); // eslint-disable-line no-undefined
        this.initialDispatch();
      });
    }
  }

  play () {
    console.log('figure out how to play video');
  }
/*
  Here is a naive implementation of a cached store.
  This is planned to be implemented with the rail palyer MVP
  We don't want to over-fetch resources if two elements
  on the page have the same src attribute
  createStore () {
    let cachedStore;
    cachedStore = videoStores[this.props.src];
    if (!videoStores[this.props.src]) {
      videoStores[this.props.src] = new Store({
        schema: this.constructor.schema
      });
    }
    return videoStores[this.props.src];
  }

  disconnectFromStore () {
    if (this.store.components.length <= 0) {
      Object.keys(videoStores).forEach((src) => {
        if (videoStores[src] === this.store) {
          delete videoStores[src];
        }
      });
    }
  }
*/
  render () {
    return (
      <BulbsVideoRoot
        {...this.props}
        {...this.state}
        actions={this.store.actions}
        autoplayNext={typeof this.props.twitterHandle === 'string'}
        playsinline={typeof this.props.playsInline === 'string'}
        disableMetaLink={typeof this.props.disableMetaLink === 'string'}
        disableSharing={typeof this.props.disableSharing === 'string'}
        embedded={typeof this.props.embedded === 'string'}
        enablePosterMeta={typeof this.props.enablePosterMeta === 'string'}
        hideControls={typeof this.props.hideControls === 'string'}
        muted={typeof this.props.muted === 'string'}
        noCover={typeof this.props.noCover === 'string'}
        noEndcard={typeof this.props.noEndcard === 'string'}
      />
    );
  }
}

Object.assign(BulbsVideo, {
  displayName: 'BulbsVideo',
  schema: {
    video: VideoField,
    videoRequest: VideoRequest,
    controller: ControllerField,
  },
  propTypes: {
    autoplay: PropTypes.string,
    autoplayNext: PropTypes.string,
    disableMetaLink: PropTypes.string,
    disableSharing: PropTypes.string,
    embedded: PropTypes.string,
    enablePosterMeta: PropTypes.string,
    hideControls: PropTypes.string,
    muted: PropTypes.string,
    noCover: PropTypes.string,
    noEndcard: PropTypes.string,
    playsInline: PropTypes.string,
    src: PropTypes.string.isRequired,
    targetCampaignId: PropTypes.string,
    targetCampaignNumber: PropTypes.string,
    targetHostChannel: PropTypes.string,
    targetSpecialCoverage: PropTypes.string,
    twitterHandle: PropTypes.string,
  },
});

const LazyBulbsVideo = loadOnDemand(BulbsVideo);
LazyBulbsVideo.extendDOM = {
  play () {
    try {
      this.querySelector('.bulbs-video-viewport').dispatchEvent(
        new CustomEvent('play-requested')
      );
    }
    catch (error) {
    }
  },

  pause () {
    try {
      this.querySelector('.bulbs-video-viewport').dispatchEvent(
        new CustomEvent('pause-requested')
      );
    }
    catch (error) {
    }
  },
};

registerReactElement('bulbs-video', LazyBulbsVideo);

import './elements/meta';
import './elements/summary';
import './elements/rail-player';
import './elements/video-carousel';
