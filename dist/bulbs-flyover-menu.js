webpackJsonp([7],{0:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){for(var n=Object.getOwnPropertyNames(e),r=0;r<n.length;r++){var o=n[r],u=Object.getOwnPropertyDescriptor(e,o);u&&u.configurable&&void 0===t[o]&&Object.defineProperty(t,o,u)}return t}function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):o(t,e))}function s(){}var l=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),c=n(2);n(219);var f=n(1),p=r(f);s.prototype=HTMLButtonElement.prototype;var b={menus:{},get:function(t){var e=b.menus[t];return e?e:(e={openButtons:[],menu:null},b.menus[t]=e,e)}},h=function(t){function e(){return u(this,e),i(this,t.apply(this,arguments))}return a(e,t),e.prototype.createdCallback=function(){(0,p["default"])(this.hasAttribute("menu-name"),"<bulbs-flyover-menu> MUST have a `menu-name` attribute;"),this.flyoverState.menu=this},e.prototype.attachedCallback=function(){this.addEventListener("click",this.closeFlyover.bind(this))},e.prototype.openFlyover=function(){this.classList.add("bulbs-flyover-open"),this.flyoverState.openButtons.forEach(function(t){t.setAttribute("aria-expanded","true")})},e.prototype.closeFlyover=function(){this.classList.remove("bulbs-flyover-open"),this.flyoverState.openButtons.forEach(function(t){t.setAttribute("aria-expanded","false")})},l(e,[{key:"flyoverState",get:function(){return b.get(this.menuName)}}]),e}(c.BulbsHTMLElement),y=function(t){function e(){return u(this,e),i(this,t.apply(this,arguments))}return a(e,t),e.prototype.createdCallback=function(){(0,p["default"])(this.hasAttribute("menu-name"),'<button is="bulbs-flyover-close"> MUST have a `menu-name` attribute;')},e.prototype.attachedCallback=function(){var t=this;this.addEventListener("click",function(){return t.flyoverState.menu.closeFlyover()})},l(e,[{key:"flyoverState",get:function(){return b.get(this.menuName)}}]),e}(s);y["extends"]="button";var v=function(t){function e(){return u(this,e),i(this,t.apply(this,arguments))}return a(e,t),e.prototype.createdCallback=function(){(0,p["default"])(this.hasAttribute("menu-name"),'<button is="bulbs-flyover-open"> MUST have a `menu-name` attribute;')},e.prototype.attachedCallback=function(){var t=this;this.flyoverState.openButtons.push(this),this.setAttribute("aria-haspopup","true"),this.setAttribute("aria-expanded","false"),this.addEventListener("click",function(){return t.flyoverState.menu.openFlyover()})},l(e,[{key:"flyoverState",get:function(){return b.get(this.menuName)}}]),e}(s);v["extends"]="button",(0,c.registerElement)("bulbs-flyover-menu",h),(0,c.registerElement)("bulbs-flyover-open",v),(0,c.registerElement)("bulbs-flyover-close",y)},219:function(t,e){}});
//# sourceMappingURL=bulbs-flyover-menu.js.map