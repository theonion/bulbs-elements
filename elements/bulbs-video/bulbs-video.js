import React, { PropTypes } from 'react';
import { registerReactElement } from 'bulbs-elements/register';
import BulbsElement from 'bulbs-elements/bulbs-element';
import { loadOnDemand } from 'bulbs-elements/util'

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
      this.store.actions.resetController();
      this.store.actions.setVideoField(null); // eslint-disable-line no-undefined
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
    let allProps = {
      ...this.props,
      ...this.state,
      actions: this.store.actions,
      autoplayNext: typeof this.props.twitterHandle === 'string',
      disableLazyLoading: typeof this.props.disableLazyLoading === 'string',
      disableMetaLink: typeof this.props.disableMetaLink === 'string',
      embedded: typeof this.props.embedded === 'string',
      enablePosterMeta: typeof this.props.enablePosterMeta === 'string',
      muted: typeof this.props.muted === 'string',
      noEndcard: typeof this.props.noEndcard === 'string',
    };

    if (!allProps.disableLazyLoading) {

      return loadOnDemand(BulbsVideoRoot)(allProps);
    }

    return (
      <BulbsVideoRoot {...allProps} />
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
    disableLazyLoading: PropTypes.string,
    disableMetaLink: PropTypes.string,
    embedded: PropTypes.string,
    enablePosterMeta: PropTypes.string,
    muted: PropTypes.string,
    noEndcard: PropTypes.string,
    src: PropTypes.string.isRequired,
    targetCampaignId: PropTypes.string,
    targetCampaignNumber: PropTypes.string,
    targetHostChannel: PropTypes.string,
    targetSpecialCoverage: PropTypes.string,
    twitterHandle: PropTypes.string,
  },
});

registerReactElement('bulbs-video', BulbsVideo);

import './elements/meta';
import './elements/summary';
import './elements/rail-player';
import './elements/video-carousel';
