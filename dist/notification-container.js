webpackJsonp([23],{0:function(t,e,o){(function(t){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function n(t,e){for(var o=Object.getOwnPropertyNames(e),i=0;i<o.length;i++){var n=o[i],r=Object.getOwnPropertyDescriptor(e,n);r&&r.configurable&&void 0===t[n]&&Object.defineProperty(t,n,r)}return t}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function c(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):n(t,e))}Object.defineProperty(e,"__esModule",{value:!0});var s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(t[i]=o[i])}return t},l=o(221),f=i(l),u=o(327),p=i(u),d=o(1),h=i(d),y=o(172),b=i(y),m=o(2);o(328);var v=function(e){function o(i){r(this,o),(0,h["default"])(!!i.src,"notification-container component requires a src");var n=a(this,e.call(this,i)),c=JSON.parse(t.localStorage.getItem("onion-local-notification-ids")||"[]");return n.state={localNotificationIds:c,notification:null},n}return c(o,e),o.prototype.requestNotifications=function(t){fetch(t,{credentials:"include"}).then(function(t){return t.json()}).then(this.handleRequestSuccess.bind(this))},o.prototype.componentDidMount=function(){this.requestNotifications(this.props.src)},o.prototype.handleRequestSuccess=function(e){var o=e.results,i=e.next||null;this.state.localNotificationIds.length>0&&(o=this.removeLocalNotifications(o)),o.length>0?(this.setState({notification:o[0],localNotificationIds:this.state.localNotificationIds.concat([o[0].id])}),t.localStorage.setItem("onion-local-notification-ids",JSON.stringify(this.state.localNotificationIds))):i&&this.requestNotifications(i)},o.prototype.removeLocalNotifications=function(t){var e=this,o=[];return t.forEach(function(t){e.state.localNotificationIds.indexOf(t.id)===-1&&o.push(t)}),o},o.prototype.notificationsAreActive=function(){var e=JSON.parse(t.sessionStorage.getItem("onion-notifications-off")||"false");return!e},o.prototype.render=function(){return this.state.notification&&this.notificationsAreActive()?b["default"].createElement(p["default"],{notification:this.state.notification,closeContent:this.props.closeContent}):null},o}(f["default"]);s(v,{displayName:"NotificationContainer",propTypes:{closeContent:y.PropTypes.string,src:y.PropTypes.string.isRequired}}),(0,m.registerReactElement)("notification-container",v),e["default"]=v}).call(e,function(){return this}())},327:function(t,e,o){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function n(t,e){for(var o=Object.getOwnPropertyNames(e),i=0;i<o.length;i++){var n=o[i],r=Object.getOwnPropertyDescriptor(e,n);r&&r.configurable&&void 0===t[n]&&Object.defineProperty(t,n,r)}return t}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function c(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):n(t,e))}Object.defineProperty(e,"__esModule",{value:!0});var s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(t[i]=o[i])}return t},l=o(221),f=i(l),u=o(1),p=i(u),d=o(172),h=i(d),y=o(16),b=i(y),m=function(t){function e(o){return r(this,e),(0,p["default"])(!!o.notification,"notification-display component requires notification"),a(this,t.call(this,o))}return c(e,t),e.prototype.deleteThis=function(){var t=b["default"].findDOMNode(this),e=t.closest("notification-container");e.remove(),window.sessionStorage.setItem("onion-notifications-off",JSON.stringify(!0))},e.prototype.render=function(){return this.props.notification?h["default"].createElement("div",{className:"notification-display"},h["default"].createElement("a",{href:this.props.notification.clickthrough_url,"data-track-action":"Notifications: Clickthrough","data-track-label":this.props.notification.clickthrough_url},h["default"].createElement("div",{className:"notification-logo"}),h["default"].createElement("div",{className:"notification-content"},h["default"].createElement("div",{className:"notification-headline"},this.props.notification.headline),h["default"].createElement("div",{className:"notification-body"},h["default"].createElement("p",null,this.props.notification.body,h["default"].createElement("a",{className:"notification-cta"},this.props.notification.clickthrough_cta))))),h["default"].createElement("div",{className:"notification-close","data-track-action":"Notifications: Close","data-track-label":"#",onClick:this.deleteThis.bind(this)},this.props.closeContent)):h["default"].createElement("div",{className:"inactive-notification-display"})},e}(f["default"]);s(m,{displayName:"NotificationDisplay",propTypes:{closeContent:d.PropTypes.string,notification:d.PropTypes.object.isRequired}}),e["default"]=m},328:function(t,e){}});
//# sourceMappingURL=notification-container.js.map