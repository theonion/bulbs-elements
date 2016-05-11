import React, { PropTypes  } from 'react';
import { registerReactElement } from 'bulbs-elements/register';
import BulbsElement from 'bulbs-elements/bulbs-element';

import VideoField from '../fields/video';
import VideoRequest from '../fields/video-request';

export default class VideoMeta extends BulbsElement {
  initialDispatch () {
    this.store.actions.fetchVideo(this.props.src);
  }

  componentWillReceiveProps (props) {
    if (this.props.src !== props.src) {
      this.store.actions.fetchVideo(props.src);
    }
  }
  render () {
    if(!this.state.video) {
      return <div/>;
    }
    return (
      <div className='bulbs-video-meta'>
        <div className='bulbs-video-meta-title'>
          {this.state.video.title}
        </div>
        <share-tools
          share-title={this.state.video.title}
          share-url={window.location.href}
        >
          <share-via-facebook icon label/>
          <share-via-twitter twitter-handle={this.props.twitterHandle} icon label/>
          <share-via-email message={this.props.emailShareMessage} icon label/>
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
    twitterHandle: PropTypes.string.isRequired,
    emailShareMessage: PropTypes.string.isRequired,
  },
});

registerReactElement('bulbs-video-meta', VideoMeta);
