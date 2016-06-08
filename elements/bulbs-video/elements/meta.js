import React, { PropTypes } from 'react';
import { registerReactElement } from 'bulbs-elements/register';
import BulbsElement from 'bulbs-elements/bulbs-element';

import VideoField from '../fields/video';
import VideoRequest from '../fields/video-request';

import './meta.scss';

export default class VideoMeta extends BulbsElement {
  initialDispatch() {
    this.store.actions.fetchVideo(this.props.src);
  }

  componentWillReceiveProps(props) {
    if (this.props.src !== props.src) {
      this.store.actions.fetchVideo(props.src);
    }
  }
  render() {
    if(!this.state.video) {
      return <div/>;
    }

    return (
      <div className='bulbs-video-meta'>
        <h1 className='bulbs-video-meta-title'>
          {this.state.video.title}
        </h1>
        <share-tools
          share-title={this.state.video.title}
          share-url={window.location}
          data-track-action={this.props.shareTrackAction}
        >
          <share-via-facebook label icon></share-via-facebook>
          <share-via-twitter label icon twitter-handle={this.props.shareTwitterHandle}></share-via-twitter>
          <share-via-email label icon message={this.props.shareEmailMessage}></share-via-email>
        </share-tools>
      </div>
    );
  }
}

Object.assign(VideoMeta, {
  displayName: 'BulbsVideoMeta',
  schema: {
    video: VideoField,
    videoRequest: VideoRequest,
  },
  propTypes: {
    shareEmailMessage: PropTypes.string.isRequired,
    shareTrackCatagory: PropTypes.string.isRequired,
    shareTwitterHandle: PropTypes.string.isRequired,
  },
});

registerReactElement('bulbs-video-meta', VideoMeta);
