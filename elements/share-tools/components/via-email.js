/* global BULBS_ELEMENTS_ANALYTICS_MANAGER */

import React, { PropTypes } from 'react';
import ShareTool from './share-tool';

import ShareButton from './share-button';

export default class ShareViaEmail extends ShareTool {

  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {
    this.setEmailUrl(this.shareTitle, this.shareUrl);
  }

  setEmailUrl (title, url) {
    this.setState({ emailUrl: `mailto:?subject=${encodeURIComponent(title)}&body=${url} %0D%0A%0D%0A${this.props.message}` }); // eslint-disable-line max-len
  }

  render () {
    return (
      <ShareButton
        className='share-via-email'
        dataTrackLabel='Email'
        iconClassName='fa fa-envelope'
        icon={this.hasIcon()}
        label={this.hasLabel()}
        labelText='Email'
        href={this.state.emailUrl}
      />
    );
  }
}

ShareViaEmail.propTypes = Object.assign({}, ShareTool.propTypes, {
  message: PropTypes.string.isRequired,
});
