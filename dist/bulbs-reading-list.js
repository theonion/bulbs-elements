webpackJsonp([22],{0:function(e,t,n){"use strict";function i(e,t){for(var n=Object.getOwnPropertyNames(t),i=0;i<n.length;i++){var r=n[i],o=Object.getOwnPropertyDescriptor(t,r);o&&o.configurable&&void 0===e[r]&&Object.defineProperty(e,r,o)}return e}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):i(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var s=n(1);n(305),n(306);var l=function(e){function t(){return r(this,t),o(this,e.apply(this,arguments))}return a(t,e),t.prototype.attachedCallback=function(){},t}(s.BulbsHTMLElement);(0,s.registerElement)("bulbs-reading-list",l),t.default=l},305:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t){for(var n=Object.getOwnPropertyNames(t),i=0;i<n.length;i++){var r=n[i],o=Object.getOwnPropertyDescriptor(t,r);o&&o.configurable&&void 0===e[r]&&Object.defineProperty(e,r,o)}return e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):r(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var l=n(1),c=n(36),d=i(c),u=n(186),f=(0,u.debouncePerFrame)(),p=function(e){function t(){return o(this,t),a(this,e.apply(this,arguments))}return s(t,e),t.prototype.attachedCallback=function(){var e="<bulbs-reading-list-item> requires attribute: ";(0,d.default)(this.dataset.id,e+"data-id"),(0,d.default)(this.dataset.href,e+"data-href"),(0,d.default)(this.dataset.partialUrl,e+"data-partial-url"),(0,d.default)(this.dataset.title,e+"data-title"),(0,d.default)(this.dataset.contentAnalyticsDimensions,e+"data-content-analytics-dimensions"),(0,d.default)(window.GOOGLE_ANALYTICS_ID,"<bulbs-reading-list-item> requires GOOGLE_ANALYTICS_ID set on the window"),u.InViewMonitor.add(this),this.id=parseInt(this.dataset.id,10),this.href=this.dataset.href,this.partialUrl=this.dataset.partialUrl,this.title=this.dataset.title,this.gaDimensions=this.getGaDimensions(),this.isLoaded=!1,this.fetchPending=!1,this.loadingTemplate='<p><i class="fa fa-spinner fa-spin"></i> Loading...</p>',this.registerEvents()},t.prototype.registerEvents=function(){this.addEventListener("approachingviewport",this.loadContent.bind(this)),this.addEventListener("pagestart",this.handlePageStart.bind(this))},t.prototype.getGaDimensions=function(){var e=JSON.parse(this.dataset.contentAnalyticsDimensions);return{dimension1:e.dimension1||"None",dimension2:e.dimension2||"None",dimension3:e.dimension3||"None",dimension4:e.dimension4||"None",dimension5:e.dimension5||"None",dimension6:e.dimension6||"None",dimension7:e.dimension7||"None",dimension8:e.dimension8||"None",dimension9:e.dimension9||"None",dimension10:e.dimension10||"None",dimension11:e.dimension11||"None",dimension12:e.dimension12||"None",dimension13:e.dimension13||"None"}},t.prototype.prepGaTracker=function(){return(0,u.prepGaEventTracker)("pageview",window.GOOGLE_ANALYTICS_ID,this.dimensions)},t.prototype.sendAnalyticsEvent=function(){this.gaTrackerWrapper("send","event","reading_list","scroll_view",this.href)},t.prototype.loadContent=function(){var e=this;return new Promise(function(t,n){e.shouldLoad()&&(e.fetchPending=!0,e.fillContent(e.loadingTemplate),fetch(e.partialUrl,{credentials:"same-origin"}).then(u.filterBadResponse).then(u.getResponseText).then(function(n){e.handleLoadContentComplete(n),t(e)}).catch(function(t){e.handleLoadContentError(t),n(e)}))})},t.prototype.shouldLoad=function(){return!(this.isLoaded||this.fetchPending)},t.prototype.fillContent=function(e){this.innerHTML=e,this.dataset.loadStatus="loading"},t.prototype.handleLoadContentComplete=function(e){this.fillContent(e),this.isLoaded=!0,this.fetchPending=!1,this.dataset.loadStatus="loaded"},t.prototype.handleLoadContentError=function(e){return this.fetchPending=!1,new Promise(function(t,n){return n('<bulbs-reading-list-item> loadContent(): fetch failed "'+e.status+" "+e.statusText+'"')})},t.prototype.handlePageStart=function(){var e=this;f(function(){e.gaTrackerWrapper||(e.gaTrackerWrapper=e.prepGaTracker()),history.replaceState({},e.title,e.href),(0,u.getAnalyticsManager)().trackPageView(e.href,e.title,e.gaTrackerWrapper),e.sendAnalyticsEvent()})},t}(l.BulbsHTMLElement);(0,l.registerElement)("bulbs-reading-list-item",p),t.default=p},306:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t){for(var n=Object.getOwnPropertyNames(t),i=0;i<n.length;i++){var r=n[i],o=Object.getOwnPropertyDescriptor(t,r);o&&o.configurable&&void 0===e[r]&&Object.defineProperty(e,r,o)}return e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):r(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var l=n(1),c=n(36),d=i(c),u=function(e){function t(){return o(this,t),a(this,e.apply(this,arguments))}return s(t,e),t.prototype.attachedCallback=function(){(0,d.default)(this.getAttribute("reading-list-id"),'<bulbs-reading-list-articles> requires a "reading-list-id" attribute')},t}(l.BulbsHTMLElement);(0,l.registerElement)("bulbs-reading-list-articles",u),t.default=u}});
//# sourceMappingURL=bulbs-reading-list.js.map