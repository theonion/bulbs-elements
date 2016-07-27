import BulbsElement from 'bulbs-elements/bulbs-element';
import NotificationDisplay from './notification-display';
import invariant from 'invariant';
import React, { PropTypes } from 'react';
import { registerReactElement } from 'bulbs-elements/register';


var localStorageMixin = require('react-localstorage');
var reactMixin = require('react-mixin');


class NotificationContainer extends BulbsElement {

  constructor (props) {
    invariant(!!props.src, 'notification-container component requires a src');
    super(props);
    this.state = {
      local_notification_ids: [],
      notification: {}
    };
  }

  getStateFilterKeys () {
    return ['local_notification_ids'];
  }

  componentDidMount () {
    fetch(this.props.src)
      .then(function(response) {
        return response.json();
      })
      .then(this.handleRequestSuccess.bind(this));
  }

  handleRequestSuccess (notifications) {
    if (notifications.length > 0) {
      this.setState({ notification: notifications[0] });
      this.setState({
        local_notification_ids: this.state.local_notification_ids.concat([notifications[0].id])
      });
    }
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
  }
});

registerReactElement('notification-container', NotificationContainer);

reactMixin.onClass(NotificationContainer, localStorageMixin);
export default NotificationContainer;