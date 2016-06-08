import React, { PropTypes } from 'react';
import { registerReactElement } from 'bulbs-elements/register';
import BulbsElement from 'bulbs-elements/bulbs-element';

import VideoField from './fields/video';
import VideoRequest from './fields/video-request';
import ControllerField from './fields/controller';

import BulbsVideoRoot from './components/root';

import './bulbs-video.scss';
import './endcard.scss';
import 'videojs/dist/video-js/video-js.css';
import 'videohub-player/dist/videohub-player.css';
import 'videojs-autoplay-toggle/videojs.autoplay-toggle.css';

// let videoStores = {};

export default class BulbsVideo extends BulbsElement {
  initialDispatch () {
    this.store.actions.fetchVideo(this.props.src);
    if (typeof this.props.autoplay === 'string') {
      this.store.actions.revealPlayer();
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.src !== prevProps.src) {
      this.store.actions.resetController();
      this.initialDispatch();
    }
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
        {...this.state}
        twitterHandle={this.props.twitterHandle}
        targetCampaignId={this.props.targetCampaignId}
        targetHostChannel={this.props.targetHostChannel}
        targetSpecialCoverage={this.props.targetSpecialCoverage}
        autoplayNext={typeof this.props.twitterHandle === 'string'}
        noEndcard={typeof this.props.noEndcard === 'string'}
        actions={this.store.actions}
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
    noEndcard: PropTypes.string,
    src: PropTypes.string.isRequired,
    targetCampaignId: PropTypes.string,
    targetHostChannel: PropTypes.string,
    targetSpecialCoverage: PropTypes.string,
    twitterHandle: PropTypes.isRequired,
  },
});

registerReactElement('bulbs-video', BulbsVideo);

import './elements/meta';
import './elements/carousel';
import './elements/carousel-buttons';
import './elements/carousel-slider';
import './elements/carousel-item';
import './elements/summary';
