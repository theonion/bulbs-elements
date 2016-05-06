import React, { PropTypes } from 'react';

export default class ShareTools extends React.Component {
	render () {
		let {
			children,
			category,
			action,
			title,
			url
		} = this.props;

		return (
			<div className='bulbs-share-tools'>
				{this.props.children}
			</div>
		)
	}
}

ShareTools.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
