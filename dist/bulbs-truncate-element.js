webpackJsonp([28],{0:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){for(var n=Object.getOwnPropertyNames(e),r=0;r<n.length;r++){var o=n[r],i=Object.getOwnPropertyDescriptor(e,o);i&&i.configurable&&void 0===t[o]&&Object.defineProperty(t,o,i)}return t}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):o(t,e))}Object.defineProperty(e,"__esModule",{value:!0});var u=n(1),l=n(36),c=r(l);n(449);var b=function(t){function e(){return i(this,e),a(this,t.apply(this,arguments))}return s(e,t),e.prototype.attachedCallback=function(){(0,c.default)(this.dataset.label,'<bulbs-truncate-element> requires a "data-label" attribute');var t=this.previousElementSibling;this.addButton=this.addButton.bind(this),this.openElement=this.openElement.bind(this),this.addButton(),this.addEventListener("click",this.openElement),t.classList.add("bulbs-truncate-element-parent-active")},e.prototype.addButton=function(){this.readMoreButton=document.createElement("button"),this.readMoreButton.classList.add("bulbs-truncate-element-button"),this.readMoreButton.innerHTML=this.dataset.label,this.appendChild(this.readMoreButton)},e.prototype.openElement=function(){var t=this.previousElementSibling;t.classList.remove("bulbs-truncate-element-parent-active"),this.classList.add("bulbs-truncate-element-inactive")},e}(u.BulbsHTMLElement);(0,u.registerElement)("bulbs-truncate-element",b),e.default=b},449:function(t,e){}});
//# sourceMappingURL=bulbs-truncate-element.js.map