webpackJsonp([12],{0:function(e,t,n){"use strict";function r(e,t){for(var n=Object.getOwnPropertyNames(t),r=0;r<n.length;r++){var o=n[r],i=Object.getOwnPropertyDescriptor(t,o);i&&i.configurable&&void 0===e[o]&&Object.defineProperty(e,o,i)}return e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):r(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(176),c=n(2);n(232);var l=["scroll","mousedown","wheel","DOMMouseScroll","mousewheel","keyup"],h=function(e){function t(){return o(this,t),i(this,e.apply(this,arguments))}return a(t,e),t.prototype.createdCallback=function(){this.handleUserEvent=this.handleUserEvent.bind(this)},t.prototype.attachedCallback=function(){var e=this;this.requireAttribute("pushstate-url"),u.InViewMonitor.add(this),"complete"===document.readyState?this.handleDocumentReady():window.addEventListener("DOMContentLoaded",function(){return e.handleDocumentReady()}),l.forEach(function(t){window.addEventListener(t,e.handleUserEvent)})},t.prototype.detachedCallback=function(){u.InViewMonitor.remove(this)},t.prototype.maybeAnchorElement=function(){var e=this;this.userIntervened||this.shouldAnchorScroll&&(this.offsetParent.scrollTop=this.offsetTop,requestAnimationFrame(function(){return e.maybeAnchorElement()}))},t.prototype.handleUserEvent=function(e){var t=this,n=e.type;"DOMMouseScroll"!==n&&"mousewheel"!==n&&"wheel"!==n&&"mousedown"!==n&&"keyup"!==n||(this.userIntervened=!0,l.forEach(function(e){window.removeEventListener(e,t.handleUserEvent)}))},t.prototype.handleDocumentReady=function(){var e=this;this.maybeAnchorElement(),this.addEventListener("pagestart",function(){return e.handlePageStart()})},t.prototype.handlePageStart=function(){history.replaceState({},this.getAttribute("pushstate-title"),this.getAttribute("pushstate-url"))},s(t,[{key:"shouldAnchorScroll",get:function(){var e=this.hasAttribute("anchor-on-load"),t=this.getAttribute("pushstate-url")===location.pathname;return e&&t}},{key:"gaDimensions",get:function(){return this.hasAttribute("ga-dimensions")?JSON.parse(this.getAttribute("ga-dimensions")):{}}}]),t}(c.BulbsHTMLElement);t["default"]=h,(0,c.registerElement)("bulbs-page-state",h)},232:function(e,t){}});
//# sourceMappingURL=bulbs-page-state.js.map