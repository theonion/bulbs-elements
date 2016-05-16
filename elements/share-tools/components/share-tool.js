import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class ShareTool extends React.Component {
  get shareTools () {
    return ReactDOM.findDOMNode(this).closest('.share-tools');
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
