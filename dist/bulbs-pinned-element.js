webpackJsonp([13],{0:function(t,e,i){"use strict";function n(t,e){for(var i=Object.getOwnPropertyNames(e),n=0;n<i.length;n++){var o=i[n],r=Object.getOwnPropertyDescriptor(e,o);r&&r.configurable&&void 0===t[o]&&Object.defineProperty(t,o,r)}return t}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):n(t,e))}Object.defineProperty(e,"__esModule",{value:!0});var a=i(2),l=i(186);i(259);var c=function(t){function e(){return o(this,e),r(this,t.apply(this,arguments))}return s(e,t),e.prototype.attachedCallback=function(){this.topOffsetAdjustment=parseInt(this.getAttribute("offset-top-px")||0,10),this.lastPosition=0,this.lastRailHeight=0,this.animationRequest=null;var t=this.querySelector("bulbs-pinned-element-car");t?this.car=t:(this.car=document.createElement("bulbs-pinned-element-car"),(0,l.moveChildren)(this,this.car),this.appendChild(this.car)),this.boundPositionCar=this.positionCar.bind(this),window.addEventListener("scroll",this.boundPositionCar),this.boundPositionCar()},e.prototype.detachedCallback=function(){window.removeEventListener("scroll",this.boundPositionCar)},e.prototype.getBoundingRects=function(){return{car:(0,l.getRoundedBoundingClientRect)(this.car),parent:(0,l.getRoundedBoundingClientRect)(this.parentElement),rail:(0,l.getRoundedBoundingClientRect)(this)}},e.prototype.isInView=function(t){return l.InViewMonitor.isElementInViewport(this,t.rail)},e.prototype.positionCar=function(){var t=this;this.animationRequest||(this.animationRequest=requestAnimationFrame(function(){t.animationRequest=null;var e=t.getBoundingRects();t.style.height=e.parent.height-Math.abs(e.parent.top-e.rail.top)+"px",t.style.width=e.parent.width+"px",t.hasNewRailHeight(e)&&t.resetCarPosition(),t.isInView(e)&&(t.isScrollingDown()?t.handleScrollDown(e):t.handleScrollUp(e))}))},e.prototype.hasNewRailHeight=function(t){var e=!1;return t.rail.height!==this.lastRailHeight&&(e=!0,this.lastRailHeight=t.rail.height),e},e.prototype.isScrollingDown=function(){var t=(0,l.getScrollOffset)(),e=!1;return t.y>this.lastPosition&&(e=!0),this.lastPosition=t.y,e},e.prototype.handleScrollDown=function(t){t.rail.bottom<=t.car.bottom?this.pinToRailBottom():t.rail.top-this.topOffsetAdjustment<=0&&this.pinToWindow()},e.prototype.handleScrollUp=function(t){t.rail.top>=t.car.top?this.resetCarPosition():t.rail.bottom-t.car.height-this.topOffsetAdjustment>=0&&this.pinToWindow()},e.prototype.resetCarPosition=function(){this.car.classList.remove("pinned","pinned-bottom"),this.car.style.bottom="",this.car.style.top=0},e.prototype.pinToRailBottom=function(){this.car.classList.remove("pinned"),this.car.classList.add("pinned-bottom"),this.car.style.bottom=0,this.car.style.top=""},e.prototype.pinToWindow=function(){this.car.classList.remove("pinned-bottom"),this.car.classList.add("pinned"),this.car.style.bottom="",this.car.style.top=this.topOffsetAdjustment+"px"},e}(a.BulbsHTMLElement);e.default=c,(0,a.registerElement)("bulbs-pinned-element",c)},259:function(t,e){}});
//# sourceMappingURL=bulbs-pinned-element.js.map