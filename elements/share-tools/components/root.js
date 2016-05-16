import React from 'react';

export default class Root extends React.Component {
  render () {
    return (
      <div
        className='share-tools'
        share-title={this.props.shareTitle}
        share-url={this.props.shareUrl}
      >
        {this.props.children}
      </div>
    );
  }
}
