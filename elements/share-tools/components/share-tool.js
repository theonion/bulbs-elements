import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class ShareTool extends React.Component {
  get DOMNode () {
    return ReactDOM.findDOMNode(this);
  }

  get shareTools () {
    return this.DOMNode.closest('share-tools');
  }

  get shareUrl () {
    return this.shareTools.getAttribute('share-url') || window.location.toString();
  }

  get shareTitle () {
    return this.shareTools.getAttribute('share-title');
  }

  hasIcon () {
    return typeof this.props.icon === 'string';
  }

  hasLabel () {
    return typeof this.props.label === 'string';
  }
}

ShareTool.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
};
