webpackJsonp([35],{0:function(e,t,r){"use strict";function n(e,t){for(var r=Object.getOwnPropertyNames(t),n=0;n<r.length;n++){var o=r[n],i=Object.getOwnPropertyDescriptor(t,o);i&&i.configurable&&void 0===e[o]&&Object.defineProperty(e,o,i)}return e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):n(e,t))}function c(e){return 100-e}Object.defineProperty(t,"__esModule",{value:!0});var a=r(2);r(506);var u=function(e){function t(){return o(this,t),i(this,e.apply(this,arguments))}return s(t,e),t.prototype.attachedCallback=function(){var e=parseInt(this.getAttribute("progress"),10)||0;this.innerHTML='<div class="progress-track" style="width: '+c(e)+'%"></div>'},t.prototype.attributeChangedCallback=function(e,t,r){"progress"===e&&this.children.length&&(this.querySelector(".progress-track").style.width=c(r)+"%")},t}(a.BulbsHTMLElement);(0,a.registerElement)("progress-bar",u),t.default=u},506:function(e,t){}});
//# sourceMappingURL=progress-bar.js.map