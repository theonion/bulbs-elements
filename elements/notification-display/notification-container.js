import BulbsElement from 'bulbs-elements/bulbs-element';
import NotificationDisplay from './notification-display';
import invariant from 'invariant';
import React, { PropTypes } from 'react';
import { registerReactElement } from 'bulbs-elements/register';


class NotificationContainer extends BulbsElement {

  constructor (props) {
    invariant(!!props.src, 'notification-container component requires a src');
    super(props);
    this.state = {
      notification: {}
    };
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

export default NotificationContainer;