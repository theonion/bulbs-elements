import BulbsElement from 'bulbs-elements/bulbs-element';
import NotificationDisplay from './notification-display';
import invariant from 'invariant';
import React, { PropTypes } from 'react';
import { registerReactElement } from 'bulbs-elements/register';

let localStorageMixin = require('react-localstorage');
let reactMixin = require('react-mixin');

class NotificationContainer extends BulbsElement {

  constructor (props) {
    invariant(!!props.src, 'notification-container component requires a src');
    super(props);
    this.state = {
      next: null,
      local_notification_ids: [],
      notification: {},
    };
  }

  getStateFilterKeys () {
    return ['local_notification_ids'];
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
    console.log(response);
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

reactMixin.onClass(NotificationContainer, localStorageMixin);
export default NotificationContainer;
