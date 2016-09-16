import React, { PropTypes } from 'react';
import { registerReactElement } from 'bulbs-elements/register';
import BulbsElement from 'bulbs-elements/bulbs-element';

import VideoField from '../../fields/video';
import VideoRequest from '../../fields/video-request';

import VideoMetaRoot from './components/root';

import './meta.scss';

export default class VideoMeta extends BulbsElement {
  initialDispatch () {
    this.store.actions.fetchVideo(this.props.src);
  }

  componentDidUpdate (prevProps) {
    if (this.props.src !== prevProps.src) {
      this.store.actions.fetchVideo(this.props.src);
    }
  }

  render () {
    return <VideoMetaRoot
              {...this.props}
              disableLink={typeof this.props.disableMetaLink === 'string'}
              video={this.state.video}/>;
  }
}

Object.assign(VideoMeta, {
  displayName: 'BulbsVideoMeta',
  schema: {
    video: VideoField,
    videoRequest: VideoRequest,
  },
  propTypes: {
    campaignPlacement: PropTypes.string,
    campaignPreamble: PropTypes.string,
    campaignTrackAction: PropTypes.string,
    campaignUrl: PropTypes.string,
    disableMetaLink: PropTypes.string,
    mobileTitle: PropTypes.string,
    titleTrackAction: PropTypes.string,
  },
});

registerReactElement('bulbs-video-meta', VideoMeta);
