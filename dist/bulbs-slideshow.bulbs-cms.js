webpackJsonp([12],[function(e,t,n){"use strict";function r(e,t){for(var n=Object.getOwnPropertyNames(t),r=0;r<n.length;r++){var o=n[r],i=Object.getOwnPropertyDescriptor(t,o);i&&i.configurable&&void 0===e[o]&&Object.defineProperty(e,o,i)}return e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):r(e,t))}var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=n(2),a=function(e){function t(){return o(this,t),i(this,e.apply(this,arguments))}return c(t,e),u(t,[{key:"embedContentPreview",get:function(){return"\n      <h1 style='text-align: center; font-family: \"Droid Serif\"'>\n        <i class='fa fa-puzzle-piece'></i>\n        Embedded BulbsSlideshow\n      </h1>\n    "}}]),t}(f.EmbeddedCMSElement);(0,f.registerElement)("bulbs-slideshow",a)}]);
//# sourceMappingURL=bulbs-slideshow.bulbs-cms.js.map