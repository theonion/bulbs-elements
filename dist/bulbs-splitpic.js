webpackJsonp([19],{0:function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){for(var i=Object.getOwnPropertyNames(e),n=0;n<i.length;n++){var o=i[n],a=Object.getOwnPropertyDescriptor(e,o);a&&a.configurable&&void 0===t[o]&&Object.defineProperty(t,o,a)}return t}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function c(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):o(t,e))}Object.defineProperty(e,"__esModule",{value:!0});var s=i(2),u=i(272),p=i(1),l=n(p);i(273);var f=function(t){function e(){return a(this,e),r(this,t.apply(this,arguments))}return c(e,t),e.prototype.attachedCallback=function(){(0,l["default"])(this.attributes.orientation.value,"BulbsSplitpic: orientation attribute is required"),this.orientation=this.attributes.orientation.value,"horizontal"===this.orientation&&(this.splitPic=new u.SplitPic(this)),"vertical"===this.orientation&&(this.splitPic=new u.SplitPicVertical(this))},e}(s.BulbsHTMLElement);(0,s.registerElement)("bulbs-splitpic",f),e["default"]=f},272:function(t,e){"use strict";function i(t){function e(t,e){var a=void 0;if(e)a=t;else{var r=i.offset();a=t-r.left}n.css("clip","rect(0px, "+a+"px, auto, 0px)"),o.css("left",a-o.width()/2+"px")}var i=$(t),n=$(".splitpic-left-image",i),o=$(".splitpic-bar",i),a=!1,r=!1,c=0,s=0,u=i.find(".splitpic-images").eq(0).data("start-percent");isNaN(u)&&(u=50),u/=100,e(i.width()*u,!0),i.on("touchmove touchstart",function(t){var n=void 0;if(a||($(".splitpic-info",i).fadeOut(200),a=!0),t.touches?n=t.touches:t.originalEvent&&t.originalEvent.touches&&(n=t.originalEvent.touches),n){var o=n[0],u=0,p=0;r?(u=o.pageX-c,p=o.pageY-s):r=!0,Math.abs(u)>Math.abs(p)&&(t.preventDefault(),e(n[0].pageX)),c=o.pageX,s=o.pageY}}),i.on("touchend",function(){r=!1}),i.on("mouseenter mousemove mouseleave",function(t){a||($(".splitpic-info",i).fadeOut(200),a=!0),e(t.pageX)})}function n(t){function e(t,e){var i=void 0;if(e)i=t;else{var r=n.offset();i=t-r.top}o.css("clip","rect("+i+"px, auto, auto, 0px)"),a.css("top",i-a.height()/2+"px")}function i(){var t=parseInt(n.attr("data-start-percent"),10);isNaN(t)&&(t=50),t/=100,e(n.height()*t,!0)}var n=$(t),o=$(".splitpic-left-image",n),a=$(".splitpic-bar",n),r=!1,c=$(".splitpic-left-image img",t),s=!1,u=0,p=0;c[0].complete?i():c.load(i.bind(this)),n.on("touchmove touchstart",function(t){var i=void 0;if(r||($(".splitpic-info",n).fadeOut(200),r=!0),t.touches?i=t.touches:t.originalEvent&&t.originalEvent.touches&&(i=t.originalEvent.touches),i){var o=i[0],a=0,c=0;s?(a=o.pageX-u,c=o.pageY-p):(c=.001,s=!0),Math.abs(c)>Math.abs(a)&&Math.abs(c)<10&&(t.preventDefault(),e(o.pageY)),u=o.pageX,p=o.pageY}}),n.on("touchend",function(){s=!1}),n.on("mouseenter mousemove mouseleave",function(t){r||($(".splitpic-info",n).fadeOut(200),r=!0),e(t.pageY)})}Object.defineProperty(e,"__esModule",{value:!0}),e.SplitPic=i,e.SplitPicVertical=n},273:function(t,e){}});
//# sourceMappingURL=bulbs-splitpic.js.map