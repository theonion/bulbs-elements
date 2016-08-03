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
      next: null,
      local_notification_ids: idsFromStorage,
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
    this.setState({ next: response.next });

    if (this.state.local_notification_ids.length > 0) {
      notifications = this.removeLocalNotifications(notifications);
    }

    if (notifications.length > 0) {
      this.setState({ notification: notifications[0] });
      this.setState({
        local_notification_ids: this.state.local_notification_ids.concat([notifications[0].id]),
      });
      global.localStorage.setItem(
        'onion-local-notification-ids', JSON.stringify(this.state.local_notification_ids)
      );
    }
    else if (this.state.next !== null) {
      this.requestNotifications(this.state.next);
    }
  }

  removeLocalNotifications (notifications) {
    let withoutLocal = [];
    notifications.forEach((notification) => {
      if (this.state.local_notification_ids.indexOf(notification.id) === -1) {
        withoutLocal.push(notification);
      }
    });
    return withoutLocal;
  }

  render () {
    if ( this.state.notification ) {
      return (
        <NotificationDisplay notification={ this.state.notification }
        />
      );
    }
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
