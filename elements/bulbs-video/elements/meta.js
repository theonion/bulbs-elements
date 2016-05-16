import React, { PropTypes } from 'react';
import { registerReactElement } from 'bulbs-elements/register';
import BulbsElement from 'bulbs-elements/bulbs-element';

import VideoField from '../fields/video';
import VideoRequest from '../fields/video-request';

import ShareTools from '../../share-tools/components/root';
import ShareViaFacebook from '../../share-tools/components/via-facebook';
import ShareViaTwitter from '../../share-tools/components/via-twitter';
import ShareViaEmail from '../../share-tools/components/via-email';
import './meta.scss';

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
        <h1 className='bulbs-video-meta-title'>
          {this.state.video.title}
        </h1>
        <ShareTools
          shareTitle={this.state.video.title}
          shareUrl={window.location.href}
        >
          <ShareViaFacebook icon={true} label={true}/>
          <ShareViaTwitter
            twitter-handle={this.props.twitterHandle}
            icon={true} label={true}
          />
          <ShareViaEmail
            message={this.props.emailShareMessage}
            icon={true} label={true}
          />
        </ShareTools>
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
    emailShareMessage: PropTypes.string.isRequired,
    twitterHandle: PropTypes.string.isRequired,
  },
});

registerReactElement('bulbs-video-meta', VideoMeta);
