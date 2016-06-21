import React, { PropTypes } from 'react';
import { registerReactElement } from 'bulbs-elements/register';
import BulbsElement from 'bulbs-elements/bulbs-element';

import VideoField from '../../fields/video';
import VideoRequest from '../../fields/video-request';
import ControllerField from '../../fields/controller';

import RailPlayerRoot from './components/root';

import './rail-player.scss';

class RailPlayer extends BulbsElement {
  initialDispatch () {
    this.store.actions.fetchVideo(this.props.src);
  }

  componentDidUpdate (prevProps) {
    if (this.props.src !== prevProps.src) {
      this.initialDispatch();
    }
  }

  render () {
    return (
      <RailPlayerRoot
        {...this.state}
        targetCampaignId={this.props.targetCampaignId}
        targetHostChannel={this.props.targetHostChannel}
        targetSpecialCoverage={this.props.targetSpecialCoverage}
        muted={typeof this.props.muted === 'string'}
        recircUrl={this.props.recircUrl}
        actions={this.store.actions}
      />
    );
  }
}

Object.assign(RailPlayer, {
  displayName: 'BulbsVideo',
  schema: {
    video: VideoField,
    videoRequest: VideoRequest,
    controller: ControllerField,
  },
  propTypes: {
    autoplay: PropTypes.string,
    autoplayNext: PropTypes.string,
    muted: PropTypes.string,
    src: PropTypes.string.isRequired,
    targetCampaignId: PropTypes.string,
    targetHostChannel: PropTypes.string,
    targetSpecialCoverage: PropTypes.string,
  },
});

registerReactElement('rail-player', RailPlayer);
