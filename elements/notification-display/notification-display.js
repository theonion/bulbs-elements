import BulbsElement from 'bulbs-elements/bulbs-element';
import invariant from 'invariant';
import React, { PropTypes } from 'react';
import { registerReactElement } from 'bulbs-elements/register';

var LocalStorageMixin = require('react-localstorage');


class NotificationDisplay extends BulbsElement {

  constructor (props) {
    invariant(!!props.notifications, 'notification-display component requires notifications');
    super(props);
    this.mixins = [LocalStorageMixin];
    this.state = {
      notification: null,
      notifications: []
    };

  }

  render () {
    if (this.state.notifications.length > 0) {
      return (
        <div>
          this.state.notification.headline
        </div>
      );
    } else {
      return (
        <div>
        </div>
      );
    }
  }
}

Object.assign(NotificationDisplay, {
  displayName: 'NotificationDisplay',
  propTypes: {
    notifications: PropTypes.array.isRequired,
  }
});

registerReactElement('notification-display', NotificationDisplay);

export default NotificationDisplay;