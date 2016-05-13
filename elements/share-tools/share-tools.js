import React, { PropTypes } from 'react';
import { registerReactElement } from 'bulbs-elements/register';

import './share-tools.scss';

export default class ShareTools extends React.Component {
  render () {
    if (this.props.children) {
      return this.props.children;
    }
    else {
      return <div/>;
    }
  }
}

ShareTools.propTypes = {
  children: PropTypes.node,
  dataTrackAction: PropTypes.string.isRequired,
  dataTrackCategory: PropTypes.string.isRequired,
  shareTitle: PropTypes.string.isRequired,
  shareUrl: PropTypes.string.isRequired,
};

registerReactElement('share-tools', ShareTools);

import ShareViaFacebook from './components/via-facebook';
import ShareViaTwitter from './components/via-twitter';
import ShareViaEmail from './components/via-email';

registerReactElement('share-via-facebook', ShareViaFacebook);
registerReactElement('share-via-twitter', ShareViaTwitter);
registerReactElement('share-via-email', ShareViaEmail);
