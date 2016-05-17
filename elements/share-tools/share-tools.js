import React, { PropTypes } from 'react';
import { registerReactElement } from 'bulbs-elements/register';

import Root from './components/root';

import './share-tools.scss';

export default class ShareTools extends React.Component {
  render () {
    return <Root {...this.props}/>;
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
