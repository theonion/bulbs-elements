webpackJsonp([2],{0:function(e,t,r){"use strict";function n(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}function i(e,t){for(var r=Object.getOwnPropertyNames(t),n=0;n<r.length;n++){var i=r[n],o=Object.getOwnPropertyDescriptor(t,i);o&&o.configurable&&void 0===e[i]&&Object.defineProperty(e,i,o)}return e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):i(e,t))}function d(){}var c=r(1),s=r(186),p=r(217),l=n(p);r(220),d.prototype=HTMLVideoElement.prototype;var v=function(e){function t(){return o(this,t),a(this,e.apply(this,arguments))}return u(t,e),t.prototype.createdCallback=function(){Object.defineProperty(this,"duration",{get:function(){return parseFloat(this.getAttribute("cinemagraph-duration"))||0}})},t.prototype.attachedCallback=function(){var e=this;this.hasAttribute("cinemagraph-duration")||console.warn('is="bulbs-cinemagraph" elements should have a [cinemagraph-duration] attribute set'),this.setAttribute("loop",!0),this.setAttribute("webkit-playsinline",!0),this.addEventListener("enterviewport",function(){return e.play()}),this.addEventListener("exitviewport",function(){return e.pause()}),l.default(this,!1),s.InViewMonitor.add(this)},t.prototype.detachedCallback=function(){s.InViewMonitor.remove(this)},t}(d);v.extends="video",(0,c.registerElement)("bulbs-cinemagraph",v)},217:function(e,t,r){/*! npm.im/iphone-inline-video */
"use strict";function n(e){return e&&"object"==typeof e&&"default"in e?e.default:e}function i(e,t,r,n){function i(t){Boolean(e[r])===Boolean(n)&&t.stopImmediatePropagation(),delete e[r]}return e.addEventListener(t,i,!1),i}function o(e,t,r,n){function i(){return r[t]}function o(e){r[t]=e}n&&o(e[t]),Object.defineProperty(e,t,{get:i,set:o})}function a(e,t,r){r.addEventListener(t,function(){return e.dispatchEvent(new Event(t))})}function u(e,t){Promise.resolve().then(function(){e.dispatchEvent(new Event(t))})}function d(e){var t=new Audio;return a(e,"play",t),a(e,"playing",t),a(e,"pause",t),t.crossOrigin=e.crossOrigin,t.src=e.src||e.currentSrc||"data:",t}function c(e,t,r){(y||0)+200<Date.now()&&(e[O]=!0,y=Date.now()),r||(e.currentTime=t),k[++P%3]=100*t|0}function s(e){return e.driver.currentTime>=e.video.duration}function p(e){var t=this;t.video.readyState>=t.video.HAVE_FUTURE_DATA?(t.hasAudio||(t.driver.currentTime=t.video.currentTime+e*t.video.playbackRate/1e3,t.video.loop&&s(t)&&(t.driver.currentTime=0)),c(t.video,t.driver.currentTime)):t.video.networkState!==t.video.NETWORK_IDLE||t.video.buffered.length||t.video.load(),t.video.ended&&(delete t.video[O],t.video.pause(!0))}function l(){var e=this,t=e[E];return e.webkitDisplayingFullscreen?void e[T]():("data:"!==t.driver.src&&t.driver.src!==e.src&&(c(e,0,!0),t.driver.src=e.src),void(e.paused&&(t.paused=!1,e.buffered.length||e.load(),t.driver.play(),t.updater.start(),t.hasAudio||(u(e,"play"),t.video.readyState>=t.video.HAVE_ENOUGH_DATA&&u(e,"playing")))))}function v(e){var t=this,r=t[E];r.driver.pause(),r.updater.stop(),t.webkitDisplayingFullscreen&&t[A](),r.paused&&!e||(r.paused=!0,r.hasAudio||u(t,"pause"),t.ended&&(t[O]=!0,u(t,"ended")))}function f(e,t){var r=e[E]={};r.paused=!0,r.hasAudio=t,r.video=e,r.updater=g.frameIntervalometer(p.bind(r)),t?r.driver=d(e):(e.addEventListener("canplay",function(){e.paused||u(e,"playing")}),r.driver={src:e.src||e.currentSrc||"data:",muted:!0,paused:!0,pause:function(){r.driver.paused=!0},play:function(){r.driver.paused=!1,s(r)&&c(e,0)},get ended(){return s(r)}}),e.addEventListener("emptied",function(){var t=!r.driver.src||"data:"===r.driver.src;r.driver.src&&r.driver.src!==e.src&&(c(e,0,!0),r.driver.src=e.src,t?r.driver.play():r.updater.stop())},!1),e.addEventListener("webkitbeginfullscreen",function(){e.paused?t&&!r.driver.buffered.length&&r.driver.load():(e.pause(),e[T]())}),t&&(e.addEventListener("webkitendfullscreen",function(){r.driver.currentTime=e.currentTime}),e.addEventListener("seeking",function(){k.indexOf(100*e.currentTime|0)<0&&(r.driver.currentTime=e.currentTime)}))}function h(e){var t=e[E];e[T]=e.play,e[A]=e.pause,e.play=l,e.pause=v,o(e,"paused",t.driver),o(e,"muted",t.driver,!0),o(e,"playbackRate",t.driver,!0),o(e,"ended",t.driver),o(e,"loop",t.driver,!0),i(e,"seeking"),i(e,"seeked"),i(e,"timeupdate",O,!1),i(e,"ended",O,!1)}function m(e,t,r){void 0===t&&(t=!0),void 0===r&&(r=!0),r&&!w||e[E]||(f(e,t),h(e),e.classList.add("IIV"),!t&&e.autoplay&&e.play(),/iPhone|iPod|iPad/.test(navigator.platform)||console.warn("iphone-inline-video is not guaranteed to work in emulated environments"))}var y,b=n(r(218)),g=r(219),w="object-fit"in document.head.style&&/iPhone|iPod/i.test(navigator.userAgent)&&!matchMedia("(-webkit-video-playable-inline)").matches,E=b(),O=b(),T=b("nativeplay"),A=b("nativepause"),k=[],P=0;m.isWhitelisted=w,e.exports=m},218:function(e,t){"use strict";var r="undefined"==typeof Symbol?function(e){return"@"+(e||"@")+Math.random()}:Symbol;e.exports=r},219:function(e,t){/*! npm.im/intervalometer */
"use strict";function r(e,t,r,n){function i(r){o=t(i,n),e(r-(a||r)),a=r}var o,a;return{start:function(){o||i(0)},stop:function(){r(o),o=null,a=0}}}function n(e){return r(e,requestAnimationFrame,cancelAnimationFrame)}function i(e,t){return r(e,setTimeout,clearTimeout,t)}Object.defineProperty(t,"__esModule",{value:!0}),t.intervalometer=r,t.frameIntervalometer=n,t.timerIntervalometer=i},220:function(e,t){}});
//# sourceMappingURL=bulbs-cinemagraph.js.map