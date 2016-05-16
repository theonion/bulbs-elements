import React, { PropTypes } from 'react';

export default class Root extends React.Component {
  render () {
    return (
      <div
        className='share-tools'
        data-share-title={this.props.shareTitle}
        data-share-url={this.props.shareUrl}
      >
        {this.props.children}
      </div>
    );
  }
}

Root.propTypes = {
  children: PropTypes.node,
  shareTitle: PropTypes.string.isRequired,
  shareUrl: PropTypes.string.isRequired,
};
