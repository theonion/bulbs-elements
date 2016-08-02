import BulbsElement from 'bulbs-elements/bulbs-element';
import NotificationDisplay from './notification-display';
import invariant from 'invariant';
import React, { PropTypes } from 'react';
import { registerReactElement } from 'bulbs-elements/register';


class NotificationContainer extends BulbsElement {

  constructor (props) {
    invariant(!!props.src, 'notification-container component requires a src');
    super(props);
    let local_notification_ids = this.getFromLocalStorage('local_notification_ids');
    if (local_notification_ids == null) { local_notification_ids = []; }
    this.state = {
      next: null,
      local_notification_ids: local_notification_ids,
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

  setToLocalStorage(stateKey) {
    global.localStorage.setItem(stateKey, JSON.stringify(this.state[stateKey]));
  }

  getFromLocalStorage(stateKey) {
    return JSON.parse(global.localStorage.getItem(stateKey));
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
      this.setToLocalStorage('local_notification_ids');
    }
    else if (this.state.next !== null) {
      this.requestNotifications(this.state.next);
    }
  }

  removeLocalNotifications (notifications) {
    for (let i = notifications.length - 1; i >= 0; i--) {
      if (this.state.local_notification_ids.indexOf(notifications[i].id) !== -1) {
        notifications.splice(i, 1);
      }
    }
    return notifications;
  }

  render () {
    return (
      <NotificationDisplay notification={ this.state.notification } />
    );
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
