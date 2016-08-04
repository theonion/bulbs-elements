import BulbsElement from 'bulbs-elements/bulbs-element';
import NotificationDisplay from './notification-display';
import invariant from 'invariant';
import React, { PropTypes } from 'react';
import { registerReactElement } from 'bulbs-elements/register';

import './notification-container.scss';

class NotificationContainer extends BulbsElement {

  constructor (props) {
    invariant(!!props.src, 'notification-container component requires a src');
    super(props);
    let idsFromStorage = JSON.parse(
      global.localStorage.getItem('onion-local-notification-ids') || '[]'
    );
    this.state = {
      localNotificationIds: idsFromStorage,
      notification: {},
    };
  }

  requestNotifications (src) {
    fetch(src)
      .then(function (response) {
        return response.json();
      })
      .then(this.handleRequestSuccess.bind(this));
  }

  componentDidMount () {
    this.requestNotifications(this.props.src);
  }

  handleRequestSuccess (response) {
    let notifications = response.results;
    let next = response.next || null;

    if (this.state.localNotificationIds.length > 0) {
      notifications = this.removeLocalNotifications(notifications);
    }

    if (notifications.length > 0) {
      this.setState({
        notification: notifications[0],
        localNotificationIds: this.state.localNotificationIds.concat([notifications[0].id]),
      });
      global.localStorage.setItem(
        'onion-local-notification-ids', JSON.stringify(this.state.localNotificationIds)
      );
    }
    else if (next) {
      this.requestNotifications(next);
    }
  }

  removeLocalNotifications (notifications) {
    let withoutLocal = [];
    notifications.forEach((notification) => {
      if (this.state.localNotificationIds.indexOf(notification.id) === -1) {
        withoutLocal.push(notification);
      }
    });
    return withoutLocal;
  }

  notificationsAreActive () {
    let areOff = JSON.parse(global.sessionStorage.getItem('onion-notifications-off') || 'false');
    return !areOff;
  }

  render () {
    if (this.state.notification && this.notificationsAreActive()) {
      return (
        <NotificationDisplay notification={ this.state.notification }
        />
      );
    }
    return null;
  }

}

Object.assign(NotificationContainer, {
  displayName: 'NotificationContainer',
  propTypes: {
    src: PropTypes.string.isRequired,
  },
});

registerReactElement('notification-container', NotificationContainer);
export default NotificationContainer;
