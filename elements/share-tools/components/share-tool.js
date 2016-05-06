import React, { PropTypes } from 'react';

/*
<share-tools
	url='some-url'
	title='some-title'
>
	<share-via-facebook icon label></share-via-facebook>
	<share-via-twitter account="theonion" icon label></share-via-twitter>
	<share-via-email message="via theonion.com" icon label>(/share-via-email>
</share-tools>
*/

export default class ShareTool extends React.Component {
	get shareTools () {
		return this.closest('share-tools');
	}
	get shareUrl () {
		return this.shareTools.getAttribute('data-share-url');
	}

	get shareTitle () {
		return this.shareTools.getAttribute('data-share-title');
	}
}

ShareTool.propTypes = {
  icon: PropTypes.bool,
  label: PropTypes.bool,
};
