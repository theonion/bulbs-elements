import React, { PropTypes } from 'react';
import { registerReactElement } from 'bulbs-elements/register';
import BulbsElement from 'bulbs-elements/bulbs-element';

import VideoField from './fields/video';
import VideoRequest from './fields/video-request';
import ControllerField from './fields/controller';

import BulbsVideoRoot from './components/root';

import './bulbs-video.scss';
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
    twitterHandle: PropTypes.isRequired,
  },
});

registerReactElement('bulbs-video', BulbsVideo);

import './elements/meta';
import './elements/summary';
