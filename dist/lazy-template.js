webpackJsonp([33],{0:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function i(t,e){for(var n=Object.getOwnPropertyNames(e),o=0;o<n.length;o++){var i=n[o],r=Object.getOwnPropertyDescriptor(e,i);r&&r.configurable&&void 0===t[i]&&Object.defineProperty(t,i,r)}return t}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function p(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):i(t,e))}function s(){}var c=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),u=n(2),l=n(182),h=n(1),f=o(h);n(488),s.prototype=HTMLScriptElement.prototype;var d=function(t){function e(){return r(this,e),a(this,t.apply(this,arguments))}return p(e,t),e.prototype.attachedCallback=function(){(0,f.default)(this.hasAttribute("load-on"),'<script is="lazy-template"> MUST specify a "load-on" attribute (either "page-load" or "in-view").'),(0,f.default)("text/html"===this.getAttribute("type"),'<script is="lazy-template"> MUST set the attribute type="text/html".'),"page-load"===this.loadOn?this.setupLoadOnPageLoad():"in-view"===this.loadOn&&this.setUpLoadOnInView(),this.replaceWithContents=this.replaceWithContents.bind(this),this.handleEnterViewport=this.handleEnterViewport.bind(this)},e.prototype.detachedCallback=function(){"in-view"===this.loadOn&&this.tearDownLoadOnInView()},e.prototype.setupLoadOnPageLoad=function(){var t=this;"complete"===document.readyState?this.replaceWithContents():window.addEventListener("load",function(){return t.replaceWithContents()})},e.prototype.setUpLoadOnInView=function(){l.InViewMonitor.add(this),this.addEventListener("enterviewport",this.handleEnterViewport)},e.prototype.handleEnterViewport=function(){l.InViewMonitor.remove(this),this.replaceWithContents()},e.prototype.tearDownLoadOnInView=function(){l.InViewMonitor.remove(this)},e.prototype.replaceWithContents=function(){this.outerHTML=this.textContent},c(e,[{key:"loadOn",get:function(){return this.getAttribute("load-on")}}]),e}(s);d.extends="script",(0,u.registerElement)("lazy-template",d)},488:function(t,e){}});
//# sourceMappingURL=lazy-template.js.map