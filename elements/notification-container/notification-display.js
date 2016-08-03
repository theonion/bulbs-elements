import BulbsElement from 'bulbs-elements/bulbs-element';
import invariant from 'invariant';
import React, { PropTypes } from 'react';
import { registerReactElement } from 'bulbs-elements/register';

class NotificationDisplay extends BulbsElement {

  constructor (props) {
    invariant(!!props.notification, 'notification-display component requires notification');
    super(props);
  }

  render () {
    if (this.props.notification) {
      return (
        <div className="notification-display">
          <div className="notification-logo"></div>
          <div className="notification-body">
            <p>{ this.props.notification.body }
              <a href={this.props.notification.clickthrough_url}>
                { this.props.notification.clickthrough_cta }
              </a>
            </p>
          </div>
          <div className="notification-close">&#10006;</div>
        </div>
      );
    }
    return <div className="inactive-notification-display"></div>;
  }
}

Object.assign(NotificationDisplay, {
  displayName: 'NotificationDisplay',
  propTypes: {
    notification: PropTypes.object.isRequired,
  },
});

export default NotificationDisplay;
