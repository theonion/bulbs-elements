webpackJsonp([35],{0:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){for(var r=Object.getOwnPropertyNames(t),n=0;n<r.length;n++){var o=r[n],a=Object.getOwnPropertyDescriptor(t,o);a&&a.configurable&&void 0===e[o]&&Object.defineProperty(e,o,a)}return e}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):o(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var c=r(2);r(511);var u=r(513),l=n(u),f=r(516),p=n(f),h=r(517),b=n(h),y=r(518),d=n(y),w=function(e){function t(){return a(this,t),i(this,e.apply(this,arguments))}return s(t,e),t.prototype.attributeChangedCallback=function(){var e=this.querySelector("share-via-email");e&&e.reactElement.componentDidMount()},t}(c.BulbsHTMLElement);t.default=w,(0,c.registerElement)("share-tools",w),(0,c.registerReactElement)("share-via-facebook",l.default),(0,c.registerReactElement)("share-via-twitter",p.default),(0,c.registerReactElement)("share-via-email",b.default),(0,c.registerReactElement)("share-via-disqus",d.default)},511:function(e,t){},513:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){for(var r=Object.getOwnPropertyNames(t),n=0;n<r.length;n++){var o=r[n],a=Object.getOwnPropertyDescriptor(t,o);a&&a.configurable&&void 0===e[o]&&Object.defineProperty(e,o,a)}return e}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):o(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},u=r(188),l=n(u),f=r(514),p=n(f),h=r(515),b=n(h),y="https://www.facebook.com/sharer/sharer.php?u=",d=function(e){function t(r){a(this,t);var n=i(this,e.call(this,r));return n.share=n.share.bind(n),n}return s(t,e),t.prototype.share=function(e){e.preventDefault(),window.open(y+this.shareUrl,"facebook-share","width=580,height=296")},t.prototype.render=function(){return l.default.createElement(b.default,{className:"share-via-facebook",dataTrackLabel:"Facebook",iconClassName:"fa fa-facebook",icon:this.hasIcon(),label:this.hasLabel(),labelText:"Share",onClick:this.share})},t}(p.default);t.default=d,d.propTypes=c({},p.default.proptTypes,{})},514:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){for(var r=Object.getOwnPropertyNames(t),n=0;n<r.length;n++){var o=r[n],a=Object.getOwnPropertyDescriptor(t,o);a&&a.configurable&&void 0===e[o]&&Object.defineProperty(e,o,a)}return e}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):o(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var c=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),u=r(188),l=n(u),f=r(38),p=n(f),h=function(e){function t(){return a(this,t),i(this,e.apply(this,arguments))}return s(t,e),t.prototype.hasIcon=function(){return"string"==typeof this.props.icon},t.prototype.hasLabel=function(){return"string"==typeof this.props.label},c(t,[{key:"DOMNode",get:function(){return p.default.findDOMNode(this)}},{key:"shareTools",get:function(){return this.DOMNode.closest("share-tools")}},{key:"shareUrl",get:function(){return this.shareTools.getAttribute("share-url")||window.location.toString()}},{key:"shareTitle",get:function(){var e=this.shareTools.getAttribute("share-title");if(!e){var t=document.querySelector("[property='og:title']");t&&(e=t.content)}return e}}]),t}(l.default.Component);t.default=h,h.propTypes={icon:u.PropTypes.string,label:u.PropTypes.string}},515:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){for(var r=Object.getOwnPropertyNames(t),n=0;n<r.length;n++){var o=r[n],a=Object.getOwnPropertyDescriptor(t,o);a&&a.configurable&&void 0===e[o]&&Object.defineProperty(e,o,a)}return e}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):o(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var c=r(188),u=n(c),l=function(e){function t(){return a(this,t),i(this,e.apply(this,arguments))}return s(t,e),t.prototype.render=function(){return u.default.createElement("a",{className:this.props.className,href:this.props.href||"#","data-track-label":this.props.dataTrackLabel,onClick:this.props.onClick},this.props.icon&&u.default.createElement("i",{className:"share-button-icon "+this.props.iconClassName}),this.props.label&&u.default.createElement("span",{className:"share-button-label"},this.props.labelText))},t}(u.default.Component);t.default=l,l.propTypes={className:c.PropTypes.string.isRequired,dataTrackLabel:c.PropTypes.string.isRequired,href:c.PropTypes.string,icon:c.PropTypes.bool,iconClassName:c.PropTypes.string,label:c.PropTypes.bool,labelText:c.PropTypes.string,onClick:c.PropTypes.func}},516:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){for(var r=Object.getOwnPropertyNames(t),n=0;n<r.length;n++){var o=r[n],a=Object.getOwnPropertyDescriptor(t,o);a&&a.configurable&&void 0===e[o]&&Object.defineProperty(e,o,a)}return e}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):o(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),l=r(188),f=n(l),p=r(514),h=n(p),b=r(515),y=n(b),d="http://twitter.com/share?",w=function(e){function t(r){a(this,t);var n=i(this,e.call(this,r));return n.share=n.share.bind(n),n}return s(t,e),t.prototype.share=function(e){e.preventDefault(),window.open(d+"text="+this.shareTitle+"&url="+this.shareUrl+"&via="+this.twitterHandle+"&source=webclient","twitter-share","width=550,height=235")},t.prototype.render=function(){return f.default.createElement(y.default,{className:"share-via-twitter",dataTrackLabel:"Twitter",iconClassName:"fa fa-twitter",icon:this.hasIcon(),label:this.hasLabel(),labelText:"Tweet",onClick:this.share})},u(t,[{key:"twitterHandle",get:function(){if(this.props.twitterHandle)return this.props.twitterHandle;var e=document.querySelector("[name='twitter:site']");return e?e.content.replace("@",""):null}}]),t}(h.default);t.default=w,w.propTypes=c({},h.default.propTypes,{twitterHandle:l.PropTypes.string})},517:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){for(var r=Object.getOwnPropertyNames(t),n=0;n<r.length;n++){var o=r[n],a=Object.getOwnPropertyDescriptor(t,o);a&&a.configurable&&void 0===e[o]&&Object.defineProperty(e,o,a)}return e}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):o(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},u=r(188),l=n(u),f=r(514),p=n(f),h=r(515),b=n(h),y=function(e){function t(r){a(this,t);var n=i(this,e.call(this,r));return n.state={},n}return s(t,e),t.prototype.componentDidMount=function(){this.setState({emailUrl:"mailto:?subject="+encodeURIComponent(this.shareTitle)+"&body="+this.shareUrl+" %0D%0A%0D%0A"+this.props.message})},t.prototype.render=function(){return l.default.createElement(b.default,{className:"share-via-email",dataTrackLabel:"Email",iconClassName:"fa fa-envelope",icon:this.hasIcon(),label:this.hasLabel(),labelText:"Email",href:this.state.emailUrl})},t}(p.default);t.default=y,y.propTypes=c({},p.default.propTypes,{message:u.PropTypes.string.isRequired})},518:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){for(var r=Object.getOwnPropertyNames(t),n=0;n<r.length;n++){var o=r[n],a=Object.getOwnPropertyDescriptor(t,o);a&&a.configurable&&void 0===e[o]&&Object.defineProperty(e,o,a)}return e}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):o(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var c=r(188),u=n(c),l=r(514),f=n(l),p=r(515),h=n(p),b=function(e){function t(r){a(this,t);var n=i(this,e.call(this,r));return n.share=n.share.bind(n),n}return s(t,e),t.prototype.share=function(e){e.preventDefault(),this.shareUrl===window.location.toString()?window.location.hash="#comments":window.open(this.shareUrl+"#comments")},t.prototype.render=function(){return u.default.createElement(h.default,{className:"share-via-disqus",dataTrackLabel:"Disqus",iconClassName:"fa fa-comments",icon:this.hasIcon(),label:this.hasLabel(),labelText:"Disqus",onClick:this.share})},t}(f.default);t.default=b}});
//# sourceMappingURL=share-tools.js.map