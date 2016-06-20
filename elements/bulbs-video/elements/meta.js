import React, { PropTypes } from 'react';
import { registerReactElement } from 'bulbs-elements/register';
import BulbsElement from 'bulbs-elements/bulbs-element';

import VideoField from '../fields/video';
import VideoRequest from '../fields/video-request';

import './meta.scss';

export function VideoMetaView (props) {
  if (!props.video) {
    return <div/>;
  }

  return (
    <div className='bulbs-video-meta'>
      <h1 className='bulbs-video-meta-title'>
        {props.video.title}
      </h1>
      <share-tools
        share-title={props.video.title}
        share-url={window.location}
        data-track-action={props.shareTrackAction}
      >
        <share-via-facebook label icon/>
        <share-via-twitter label icon twitter-handle={props.shareTwitterHandle}/>
        <share-via-email label icon message={props.shareEmailMessage}/>
      </share-tools>
    </div>
  );
}

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
    return <VideoMetaView {...this.props} video={this.state.video}/>;
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
