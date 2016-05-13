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
  /* FIXME: componentDidMount is called before everything is mounted in DOM
      This means this check always failse, even when everything is working
      as needed.

    Solutions:
      1. fugeddaboudit
      2. find a better lifecycle hook in React
      3. find a better lifecycle hook in defineElement
      4. do some sort of async setImmediate/etc. here

  componentDidMount () {
    if(!this.shareTools) {
      throw new Error('Share Tools MUST be contained within a <share-tools>');
    }
  }
  */

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
