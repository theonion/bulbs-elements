webpackJsonp([23],{0:function(t,e,n){"use strict";function r(t,e){for(var n=Object.getOwnPropertyNames(e),r=0;r<n.length;r++){var o=n[r],i=Object.getOwnPropertyDescriptor(e,o);i&&i.configurable&&void 0===t[o]&&Object.defineProperty(t,o,i)}return t}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):r(t,e))}Object.defineProperty(e,"__esModule",{value:!0});var s=n(2);n(438);var u=function(t){function e(){return o(this,e),i(this,t.apply(this,arguments))}return a(e,t),e.prototype.attachedCallback=function(){this.addButton=this.addButton.bind(this),this.openElement=this.openElement.bind(this),$(this).prev().addClass("bulbs-truncate-element-parent-active"),this.addButton(),this.addEventListener("click",this.openElement)},e.prototype.addButton=function(){this.readMoreButton=document.createElement("button"),this.readMoreButton.setAttribute("class","bulbs-truncate-element-button"),this.readMoreButton.innerHTML="Read More",this.appendChild(this.readMoreButton)},e.prototype.openElement=function(t){$(this).prev().removeClass("bulbs-truncate-element-parent-active"),this.remove()},e}(s.BulbsHTMLElement);(0,s.registerElement)("bulbs-truncate-element",u),e.default=u},438:function(t,e){}});
//# sourceMappingURL=bulbs-truncate-element.js.map