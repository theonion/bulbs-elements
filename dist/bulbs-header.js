webpackJsonp([10],{0:function(e,t,n){"use strict";function r(e,t){for(var n=Object.getOwnPropertyNames(t),r=0;r<n.length;r++){var i=n[r],o=Object.getOwnPropertyDescriptor(t,i);o&&o.configurable&&void 0===e[i]&&Object.defineProperty(e,i,o)}return e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):r(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var a=n(1);n(252),n(253),n(254);var c=n(195),p=function(e){function t(){return i(this,t),o(this,e.apply(this,arguments))}return s(t,e),t.prototype.attachedCallback=function(){this.masthead=this.querySelector("bulbs-header-masthead"),this.responsiveNav=this.querySelector("bulbs-header-responsive-nav"),this.masthead&&(c.InViewMonitor.isElementInViewport(this.masthead)?this.signifyMastheadActive():this.signifyResponsiveNavActive(),this.masthead.addEventListener("exitviewport",this.delegateExitViewport.bind(this)),this.masthead.addEventListener("enterviewport",this.delegateEnterViewport.bind(this))),this.responsiveNav&&!this.masthead&&this.signifyResponsiveNavActive()},t.prototype.delegateEnterViewport=function(e){e.target===this.masthead&&this.signifyMastheadActive()},t.prototype.delegateExitViewport=function(e){e.target===this.masthead&&this.signifyResponsiveNavActive()},t.prototype.signifyResponsiveNavActive=function(){this.responsiveNav&&this.responsiveNav.classList.add("responsive-nav-active"),this.classList.add("responsive-nav-active"),this.classList.remove("masthead-active")},t.prototype.signifyMastheadActive=function(){this.responsiveNav&&this.responsiveNav.classList.remove("responsive-nav-active"),this.classList.remove("responsive-nav-active"),this.classList.add("masthead-active")},t}(a.BulbsHTMLElement);(0,a.registerElement)("bulbs-header",p),t.default=p},252:function(e,t,n){"use strict";function r(e,t){for(var n=Object.getOwnPropertyNames(t),r=0;r<n.length;r++){var i=n[r],o=Object.getOwnPropertyDescriptor(t,i);o&&o.configurable&&void 0===e[i]&&Object.defineProperty(e,i,o)}return e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):r(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var a=n(1),c=n(195),p=function(e){function t(){return i(this,t),o(this,e.apply(this,arguments))}return s(t,e),t.prototype.attachedCallback=function(){c.InViewMonitor.add(this)},t.prototype.detachedCallback=function(){c.InViewMonitor.remove(this)},t}(a.BulbsHTMLElement);(0,a.registerElement)("bulbs-header-masthead",p),t.default=p},253:function(e,t,n){"use strict";function r(e,t){for(var n=Object.getOwnPropertyNames(t),r=0;r<n.length;r++){var i=n[r],o=Object.getOwnPropertyDescriptor(t,i);o&&o.configurable&&void 0===e[i]&&Object.defineProperty(e,i,o)}return e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):r(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var a=n(1),c=function(e){function t(){return i(this,t),o(this,e.apply(this,arguments))}return s(t,e),t}(a.BulbsHTMLElement);(0,a.registerElement)("bulbs-header-responsive-nav",c),t.default=c},254:function(e,t){}});
//# sourceMappingURL=bulbs-header.js.map