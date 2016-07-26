import BulbsElement from 'bulbs-elements/bulbs-element';
import invariant from 'invariant';
import React, { PropTypes } from 'react';
import { filterBadResponse, getResponseJSON } from 'bulbs-elements/util';
import { registerReactElement } from 'bulbs-elements/register';

var LocalStorageMixin = require('react-localstorage');


class NotificationDisplay extends BulbsElement {
  constructor (props) {
    invariant(!!props.src, 'notification-display component requires a src');
    super(props);
    this.mixins = [LocalStorageMixin];
    this.state = {
      notification: null,
      notifications: []
    };

    fetch(this.props.src)
      .then(function(response) {
        return response.json();
      })
      .then(this.handleRequestSuccess.bind(this));

  }

  handleRequestSuccess (notifications) {
    this.setState({notifications: notifications});
    this.setState({ notification: notifications[0] });
  }

  handleRequestError () {
    console.log('error');
  }

  render () {
    console.log(this.state.notifications.length > 0);
    if (this.state.notifications.length > 0) {
      console.log("WE DID iT!");
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
    src: PropTypes.string.isRequired,
  }
});

registerReactElement('notification-display', NotificationDisplay);

export default NotificationDisplay;