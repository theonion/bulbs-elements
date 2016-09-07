
import BulbsElement from 'bulbs-elements/bulbs-element';
import invariant from 'invariant';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

class NotificationDisplay extends BulbsElement {

  constructor (props) {
    invariant(!!props.notification, 'notification-display component requires notification');
    super(props);
  }

  deleteThis () {
    let display = ReactDOM.findDOMNode(this);
    let container = display.closest('notification-container');
    container.remove();
    window.localStorage.setItem('onion-notifications-off', JSON.stringify(true));
  }

  render () {
    if (this.props.notification) {
      return (
        <div className="notification-display">
          <a
            href={this.props.notification.clickthrough_url}
            data-track-action="Notifications: Clickthrough"
            data-track-label={this.props.notification.clickthrough_url}>
            <div className="notification-logo"></div>
            <div className="notification-content">
              <div className="notification-headline">
                { this.props.notification.headline }
              </div>
              <div className="notification-body">
                <p>{ this.props.notification.body }
                  <a className="notification-cta">
                    { this.props.notification.clickthrough_cta }
                  </a>
                </p>
              </div>
            </div>
          </a>
          <div
            className="notification-close"
            data-track-action="Notifications: Close"
            data-track-label="#"
            onClick={ this.deleteThis.bind(this) }>{ this.props.closeContent }</div>
        </div>
      );
    }
    return <div className="inactive-notification-display"></div>;
  }
}

Object.assign(NotificationDisplay, {
  displayName: 'NotificationDisplay',
  propTypes: {
    closeContent: PropTypes.string,
    notification: PropTypes.object.isRequired,
  },
});

export default NotificationDisplay;
