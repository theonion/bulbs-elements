import React, { PropTypes } from 'react';

export default class ShareTools extends React.Component {
	render () {
		return this.props.children;
	}
}

ShareTools.propTypes = {
  dataTrackAction: PropTypes.string.isRequired,
  dataTrackCategory: PropTypes.string.isRequired,
  shareTitle: PropTypes.string.isRequired,
  shareUrl: PropTypes.string.isRequired,
}
