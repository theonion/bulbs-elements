webpackJsonp([12],{0:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){for(var n=Object.getOwnPropertyNames(t),o=0;o<n.length;o++){var r=n[o],c=Object.getOwnPropertyDescriptor(t,r);c&&c.configurable&&void 0===e[r]&&Object.defineProperty(e,r,c)}return e}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):r(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},f=n(171),s=o(f),l=n(200),p=o(l),d=n(2),y=n(252),b=o(y),h=function(e){function t(){return c(this,t),i(this,e.apply(this,arguments))}return u(t,e),t.prototype.render=function(){return s["default"].createElement(b["default"],null)},t}(p["default"]);t["default"]=h,a(h,{displayName:"VideoPlayButton"}),(0,d.registerReactElement)("bulbs-video-play-button",h)},181:function(e,t){"use strict";e.exports=function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=arguments[1];Object.keys(e).forEach(function(n){t(e[n],n)})}},184:function(e,t){var n=function(){"use strict";function e(t,n,o,r){function i(t,o){if(null===t)return null;if(0==o)return t;var u,l;if("object"!=typeof t)return t;if(e.__isArray(t))u=[];else if(e.__isRegExp(t))u=new RegExp(t.source,c(t)),t.lastIndex&&(u.lastIndex=t.lastIndex);else if(e.__isDate(t))u=new Date(t.getTime());else{if(s&&Buffer.isBuffer(t))return u=new Buffer(t.length),t.copy(u),u;"undefined"==typeof r?(l=Object.getPrototypeOf(t),u=Object.create(l)):(u=Object.create(r),l=r)}if(n){var p=a.indexOf(t);if(p!=-1)return f[p];a.push(t),f.push(u)}for(var d in t){var y;l&&(y=Object.getOwnPropertyDescriptor(l,d)),y&&null==y.set||(u[d]=i(t[d],o-1))}return u}var u;"object"==typeof n&&(o=n.depth,r=n.prototype,u=n.filter,n=n.circular);var a=[],f=[],s="undefined"!=typeof Buffer;return"undefined"==typeof n&&(n=!0),"undefined"==typeof o&&(o=1/0),i(t,o)}function t(e){return Object.prototype.toString.call(e)}function n(e){return"object"==typeof e&&"[object Date]"===t(e)}function o(e){return"object"==typeof e&&"[object Array]"===t(e)}function r(e){return"object"==typeof e&&"[object RegExp]"===t(e)}function c(e){var t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),t}return e.clonePrototype=function(e){if(null===e)return null;var t=function(){};return t.prototype=e,new t},e.__objToStr=t,e.__isDate=n,e.__isArray=o,e.__isRegExp=r,e.__getRegExpFlags=c,e}();"object"==typeof e&&e.exports&&(e.exports=n)},200:function(e,t,n){(function(e){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){for(var n=Object.getOwnPropertyNames(t),o=0;o<n.length;o++){var r=n[o],c=Object.getOwnPropertyDescriptor(t,r);c&&c.configurable&&void 0===e[r]&&Object.defineProperty(e,r,c)}return e}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):r(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var a=n(171),f=o(a),s=n(201),l=o(s),p=function(t){function n(o){c(this,n);var r=i(this,t.call(this,o));return r.store=r.createStore(),r.store&&(r.store.subscribeComponent(r),e(r.initialDispatch.bind(r))),r}return u(n,t),n.prototype.createStore=function(){var e=void 0;return this.constructor.schema&&(e=new l["default"]({schema:this.constructor.schema})),e},n.prototype.initialDispatch=function(){},n}(f["default"].Component);t["default"]=p}).call(t,n(3).setImmediate)},201:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(202),c=o(r);t["default"]=c["default"]},202:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function c(e){var t={};return(0,y["default"])(e,function(e,n){t[n]=(0,p["default"])(e.initialState)}),t}function i(e){var t={};return(0,y["default"])(e,function(e,n){(0,y["default"])(e.actions,function(e,o){e.fieldName=n,e.type=o,t[o]=e})}),t}function u(e,t){var n=i(e),o={};return(0,y["default"])(n,function(e,n){o[n]=f.bind(null,t,e)}),o}function a(e){e.components.forEach(function(t){t.setState(e.state)})}function f(e,t,n){b&&console.time("dispatch "+t.type);var o=e.state,r=s({},o),c=o[t.fieldName],i=(0,p["default"])(c);r[t.fieldName]=t(i,n,e),"undefined"!=typeof r[t.fieldName]&&(e.state=r),a(e),b&&(console.groupCollapsed("DISPATCH %c"+t.type+" %c=> %c"+t.fieldName,"color:green","color:auto","color:blue"),console.timeEnd("dispatch "+t.type),console.log("PAYLOAD: ",n),console.log("PREV VALUE: ",c),console.log("NEXT VALUE: ",i),console.log("PREV STORE: ",o),console.log("NEXT STORE: ",r),console.groupEnd())}Object.defineProperty(t,"__esModule",{value:!0});var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},l=n(184),p=o(l),d=n(181),y=o(d),b=!1,h=function(){function e(t){r(this,e),this.actions=u(t.schema,this),this.state=c(t.schema),this.components=[],b&&console.log("%cCREATED STORE","color:green")}return e.prototype.subscribeComponent=function(e){this.components.push(e),e.state=this.state},e.prototype.unsubscribeComponent=function(e){var t=this.components.indexOf(e);t>-1&&this.components.splice(t,1)},e}();t["default"]=h},252:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(){return i["default"].createElement("svg",{className:"bulbs-video-play-button",viewBox:"0 0 100 100"},i["default"].createElement("circle",{className:"st0 st1",cx:"50",cy:"50",r:"45.6"}),i["default"].createElement("path",{className:"st1",d:"M50,97C24.1,97,3,75.9,3,50S24.1,3,50,3s47,21.1,47,47S75.9,97,50,97z M50,5.8C25.6,5.8,5.8,25.6,5.8,50 S25.6,94.2,50,94.2S94.2,74.4,94.2,50S74.4,5.8,50,5.8z"}),i["default"].createElement("polygon",{className:"st1",points:"36.8,27.8 74.3,51.1 36.6,74.1"}))}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=r;var c=n(171),i=o(c);n(253)},253:function(e,t){}});
//# sourceMappingURL=bulbs-video-play-button.js.map