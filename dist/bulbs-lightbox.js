webpackJsonp([11],[function(t,e,n){"use strict";function i(t,e){for(var n=Object.getOwnPropertyNames(e),i=0;i<n.length;i++){var o=n[i],r=Object.getOwnPropertyDescriptor(e,o);r&&r.configurable&&void 0===t[o]&&Object.defineProperty(t,o,r)}return t}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function c(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):i(t,e))}Object.defineProperty(e,"__esModule",{value:!0});var s=n(1),a=function(t){function e(){return o(this,e),r(this,t.apply(this,arguments))}return c(e,t),e.prototype.toggleOverlay=function(){this.classList.contains("active")?this.classList.remove("active"):this.classList.contains("active")||(this.classList.add("active"),window.picturefill&&window.picturefill())},e.prototype.attachedCallback=function(){this.querySelector(".bulbs-lightbox-overlay");this.addEventListener("click",this.toggleOverlay.bind(this))},e}(s.BulbsHTMLElement);(0,s.registerElement)("bulbs-lightbox",a),e.default=a}]);
//# sourceMappingURL=bulbs-lightbox.js.map