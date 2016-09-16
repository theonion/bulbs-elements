import BulbsElement from 'bulbs-elements/bulbs-element';
import NotificationDisplay from './notification-display';
import { NotificationSession } from './notification-session.js';
import invariant from 'invariant';
import React, { PropTypes } from 'react';
import { registerReactElement } from 'bulbs-elements/register';

import './notification-container.scss';

class NotificationContainer extends BulbsElement {

  constructor (props) {
    invariant(!!props.src, 'notification-container component requires a src');
    super(props);
    this.session = new NotificationSession();
    this.state = {
      notificationIds: this.session.getItem('ids'),
      notification: null,
    };
  }

  requestNotifications (src) {
    fetch(src, { credentials: 'include' })
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
    if (this.state.notificationIds.length > 0) {
      notifications = this.removeLocalNotifications(notifications);
    }

    if (notifications.length > 0) {
      this.setState({
        notification: notifications[0],
        notificationIds: this.state.notificationIds.concat([notifications[0].id]),
      });
      this.session.setItem('ids', this.state.notificationIds);
    }
    else if (next) {
      this.requestNotifications(next);
    }
  }

  removeLocalNotifications (notifications) {
    let withoutLocal = [];
    notifications.forEach((notification) => {
      if (this.state.notificationIds.indexOf(notification.id) === -1) {
        withoutLocal.push(notification);
      }
    });
    return withoutLocal;
  }

  notificationsAreActive () {
    let active = this.session.getItem('active');
    if (active === null) {
      active = true;
    }
    return active;
  }

  render () {
    if (this.state.notification && this.notificationsAreActive()) {
      return (
        <NotificationDisplay
          notification={ this.state.notification }
          closeContent={ this.props.closeContent }
        />
      );
    }
    return null;
  }

}

Object.assign(NotificationContainer, {
  displayName: 'NotificationContainer',
  propTypes: {
    closeContent: PropTypes.string,
    src: PropTypes.string.isRequired,
  },
});

registerReactElement('notification-container', NotificationContainer);
export default NotificationContainer;
