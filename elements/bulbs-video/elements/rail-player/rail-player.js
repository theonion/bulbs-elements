import React, { PropTypes } from 'react';
import { registerReactElement } from 'bulbs-elements/register';
import BulbsElement from 'bulbs-elements/bulbs-element';
import detectAdBlock from 'bulbs-elements/util/detect-ad-block';

import VideoField from '../../fields/video';
import VideoRequest from '../../fields/video-request';

import RailPlayerRoot from './components/root';

import Url from 'browser-url';

import './rail-player.scss';

export default class RailPlayer extends BulbsElement {

  componentDidMount () {
    detectAdBlock((isAdBlocked) => {
      this.isAdBlocked = isAdBlocked;
      this.fetchVideo();
    });
  }

  fetchVideo () {
    if (this.isAdBlocked) {
      let parsedURL = new Url(this.props.src);
      parsedURL.addQuery('adBlockActive', 'true');
      this.store.actions.fetchVideo(parsedURL.toString());
    }
    else {
      this.store.actions.fetchVideo(this.props.src);
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.src !== prevProps.src) {
      this.fetchVideo();
    }
  }

  render () {
    return (
      <RailPlayerRoot
        {...this.state}
        {...this.props}
        actions={this.store.actions}
      />
    );
  }
}

Object.assign(RailPlayer, {
  displayName: 'RailPlayer',
  schema: {
    video: VideoField,
    videoRequest: VideoRequest,
  },
  propTypes: {
    channel: PropTypes.string.isRequired,
    recircUrl: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    targetCampaignId: PropTypes.string,
  },
});

registerReactElement('rail-player', RailPlayer);
