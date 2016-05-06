import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

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
  componentDidMount () {
    if(!this.shareTools) {
      throw new Error('Share Tools MUST be contained within a <share-tools>');
    }
  }

  get shareTools () {
    return ReactDOM.findDOMNode(this).closest('share-tools');
	}
	get shareUrl () {
		return this.shareTools.getAttribute('share-url');
	}

	get shareTitle () {
		return this.shareTools.getAttribute('share-title');
	}
}

ShareTool.propTypes = {
  icon: PropTypes.bool,
  label: PropTypes.bool,
};
