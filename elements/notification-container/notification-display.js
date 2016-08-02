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
          <div className="notification-image">
            <img src="" width="60"/>
          </div>
          <div className="notification-body">
            { this.props.notification.headline }
            { this.props.notification.body }

            <a src={this.props.notification.clickthrough_url}>
              { this.props.notification.clickthrough_cta }
            </a>

          </div>
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
