webpackJsonp([30],{0:function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function o(t,e){for(var i=Object.getOwnPropertyNames(e),n=0;n<i.length;n++){var o=i[n],s=Object.getOwnPropertyDescriptor(e,o);s&&s.configurable&&void 0===t[o]&&Object.defineProperty(t,o,s)}return t}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):o(t,e))}Object.defineProperty(e,"__esModule",{value:!0});var c=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},f=i(235),l=n(f),u=i(345),p=n(u),h=i(346),d=i(1),y=n(d),v=i(169),m=n(v),b=i(2);i(347);var g=function(t){function e(i){s(this,e),(0,y.default)(!!i.src,"notification-container component requires a src");var n=r(this,t.call(this,i));return n.session=new h.NotificationSession,n.state={notificationIds:n.session.getItem("ids"),notification:null},n}return a(e,t),e.prototype.requestNotifications=function(t){fetch(t,{credentials:"include"}).then(function(t){return t.json()}).then(this.handleRequestSuccess.bind(this))},e.prototype.componentDidMount=function(){this.requestNotifications(this.props.src)},e.prototype.handleRequestSuccess=function(t){var e=t.results,i=t.next||null;this.state.notificationIds.length>0&&(e=this.removeLocalNotifications(e)),e.length>0?(this.setState({notification:e[0],notificationIds:this.state.notificationIds.concat([e[0].id])}),this.session.setItem("ids",this.state.notificationIds)):i&&this.requestNotifications(i)},e.prototype.removeLocalNotifications=function(t){var e=this,i=[];return t.forEach(function(t){e.state.notificationIds.indexOf(t.id)===-1&&i.push(t)}),i},e.prototype.notificationsAreActive=function(){var t=this.session.getItem("active");return null===t&&(t=!0),t},e.prototype.render=function(){return this.state.notification&&this.notificationsAreActive()?m.default.createElement(p.default,{notification:this.state.notification,closeContent:this.props.closeContent}):null},e}(l.default);c(g,{displayName:"NotificationContainer",propTypes:{closeContent:v.PropTypes.string,src:v.PropTypes.string.isRequired}}),(0,b.registerReactElement)("notification-container",g),e.default=g},345:function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function o(t,e){for(var i=Object.getOwnPropertyNames(e),n=0;n<i.length;n++){var o=i[n],s=Object.getOwnPropertyDescriptor(e,o);s&&s.configurable&&void 0===t[o]&&Object.defineProperty(t,o,s)}return t}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):o(t,e))}Object.defineProperty(e,"__esModule",{value:!0});var c=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},f=i(235),l=n(f),u=i(1),p=n(u),h=i(346),d=i(169),y=n(d),v=i(13),m=n(v),b=function(t){function e(i){s(this,e),(0,p.default)(!!i.notification,"notification-display component requires notification");var n=r(this,t.call(this,i));return n.session=new h.NotificationSession,n}return a(e,t),e.prototype.deleteThis=function(){var t=m.default.findDOMNode(this),e=t.closest("notification-container");e.remove(),this.session.setItem("active",!1)},e.prototype.render=function(){return this.props.notification?y.default.createElement("div",{className:"notification-display"},y.default.createElement("a",{href:this.props.notification.clickthrough_url,"data-track-action":"Notifications: Clickthrough","data-track-label":this.props.notification.clickthrough_url},y.default.createElement("div",{className:"notification-logo"}),y.default.createElement("div",{className:"notification-content"},y.default.createElement("div",{className:"notification-headline"},this.props.notification.headline),y.default.createElement("div",{className:"notification-body"},y.default.createElement("p",null,this.props.notification.body,y.default.createElement("a",{className:"notification-cta"},this.props.notification.clickthrough_cta))))),y.default.createElement("div",{className:"notification-close","data-track-action":"Notifications: Close","data-track-label":"#",onClick:this.deleteThis.bind(this)},this.props.closeContent)):y.default.createElement("div",{className:"inactive-notification-display"})},e}(l.default);c(b,{displayName:"NotificationDisplay",propTypes:{closeContent:d.PropTypes.string,notification:d.PropTypes.object.isRequired}}),e.default=b},346:function(t,e){(function(t){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});e.NotificationSession=function(){function e(){i(this,e),this.sessionKey=this.getSessionKey(),this.ls=t.localStorage,this.session=JSON.parse(this.ls.getItem(this.sessionKey)||"{}"),this.checkSession()}return e.prototype.getSessionKey=function(){var t=window.location.hostname.split(".com")[0]||"onioninc";return t+"-notificationsSession"},e.prototype.checkSession=function(){var t=Date.now();if("sessionStart"in this.session){var e=this.session.sessionStart||t,i=(t-e)/36e5;i>12&&this.newSession(t)}else this.newSession(t)},e.prototype.newSession=function(t){this.session={active:!0,ids:[],sessionStart:t}},e.prototype.updateSession=function(){this.ls.setItem(this.sessionKey,JSON.stringify(this.session))},e.prototype.setItem=function(t,e){this.session[t]=e,this.updateSession()},e.prototype.getItem=function(t){return this.session[t]},e}()}).call(e,function(){return this}())},347:function(t,e){}});
//# sourceMappingURL=notification-container.js.map