import BulbsElement from 'bulbs-elements/bulbs-element';
import invariant from 'invariant';
import React, { PropTypes } from 'react';
import { registerReactElement } from 'bulbs-elements/register';

var LocalStorageMixin = require('react-localstorage');


class NotificationDisplay extends BulbsElement {

  constructor (props) {
    invariant(!!props.notification, 'notification-display component requires notification');
    super(props);
  }

  render () {
    if (this.props.notification) {
      return (
        <div>
          { this.props.notification.headline }
        </div>
      );
    } else {
      return (<div></div>)
    }
  }
}

Object.assign(NotificationDisplay, {
  displayName: 'NotificationDisplay',
  propTypes: {
    notification: PropTypes.object.isRequired,
  }
});

registerReactElement('notification-display', NotificationDisplay);

export default NotificationDisplay;