webpackJsonp([2],{0:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){for(var n=Object.getOwnPropertyNames(t),r=0;r<n.length;r++){var o=n[r],i=Object.getOwnPropertyDescriptor(t,o);i&&i.configurable&&void 0===e[o]&&Object.defineProperty(e,o,i)}return e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):o(e,t))}Object.defineProperty(t,"__esModule",{value:!0}),t.displayPropType=void 0;var p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},u=n(1),c=r(u),l=n(190),f=r(l),d=n(176),m=r(d),h=n(32);n(217);var y=n(219),g=r(y),b=n(220),O=r(b),v=n(221),P=r(v),w=function(e){function t(n){return i(this,t),(0,f["default"])(!!n.src,"campaign-display component requires a src"),(0,f["default"])(!!n.placement,"campaign-display component requires a placement"),a(this,e.call(this,n))}return s(t,e),t.prototype.initialDispatch=function(){this.store.actions.fetchCampaign(this.props.src)},t.prototype.render=function(){if(this.state.campaignRequest.networkError)return c["default"].createElement("span",null);var e=p({},this.state,this.props,{nameOnly:"string"==typeof this.props.nameOnly,logoOnly:"string"==typeof this.props.logoOnly,noLink:"string"==typeof this.props.noLink});return c["default"].createElement(P["default"],e)},t}(m["default"]);p(w,{displayName:"CampaignDisplay",schema:{campaign:g["default"],campaignRequest:O["default"]},propTypes:{logoOnly:u.PropTypes.string,nameOnly:u.PropTypes.string,noLink:u.PropTypes.string,placement:u.PropTypes.string.isRequired,preambleText:u.PropTypes.string,src:u.PropTypes.string.isRequired}}),(0,h.registerReactElement)("campaign-display",w),t["default"]=w;t.displayPropType=w.propTypes.display},188:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var o=n(189),i=r(o),a=n(184),s=r(a);e.exports={makeRequest:i["default"],iterateObject:s["default"]}},189:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];(0,p["default"])(t.success,"makeRequest MUST have a success callback"),(0,p["default"])(t.failure,"makeRequest MUST have a failure callback"),(0,p["default"])(t.error,"makeRequest MUST have an error callback");var n=t.success,r=t.failure,o=t.error,i={success:n,failure:r,error:o},s=(0,a["default"])(t);return delete s.success,delete s.failure,delete s.error,t.redirect||(s.redirect="follow"),fetch(e,s).then(function(e){var t=void 0;return e.status<300?t=e.json().then(i.success):e.status>=400&&(t=e.json().then(i.failure)),t})["catch"](i.error)}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o;var i=n(179),a=r(i),s=n(190),p=r(s)},190:function(e,t,n){"use strict";var r=function(e,t,n,r,o,i,a,s){if(!e){var p;if(void 0===t)p=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var u=[n,r,o,i,a,s],c=0;p=new Error(t.replace(/%s/g,function(){return u[c++]})),p.name="Invariant Violation"}throw p.framesToPop=1,p}};e.exports=r},217:function(e,t){},219:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={actions:{handleFetchComplete:function(e,t){return t}}};t["default"]=n},220:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(188),o={initialState:{requestInFlight:!1},actions:{fetchCampaign:function(e,t,n){return e.requestInFlight=!0,(0,r.makeRequest)(t,{credentials:"include",success:function(e){n.actions.fetchCampaignSuccess(e),n.actions.handleFetchComplete(e)},failure:n.actions.fetchCampaignFailure,error:n.actions.fetchCampaignError}),e},fetchCampaignSuccess:function(e){e.requestInFlight=!1},fetchCampaignFailure:function(e,t){return e.requestInFlight=!1,e.requestFailure=t,e},fetchCampaignError:function(e,t){return e.requestInFlight=!1,e.networkError=t,e}}};t["default"]=o},221:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){for(var n=Object.getOwnPropertyNames(t),r=0;r<n.length;r++){var o=n[r],i=Object.getOwnPropertyDescriptor(t,o);i&&i.configurable&&void 0===e[o]&&Object.defineProperty(e,o,i)}return e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):o(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var p=n(1),u=r(p),c=n(222),l=r(c),f=n(223),d=r(f),m=n(224),h=r(m),y=n(225),g=r(y),b=function(e){function t(n){return i(this,t),a(this,e.call(this,n))}return s(t,e),t.prototype.hasId=function(){return"number"==typeof this.props.campaign.id},t.prototype.hasImageUrl=function(){return!!this.props.campaign.image_url},t.prototype.hasSponsorName=function(){return!!this.props.campaign.name},t.prototype.hasPreambleText=function(){return!!this.props.preambleText},t.prototype.pixelComponent=function(){return this.hasId()?u["default"].createElement(g["default"],{campaignId:this.props.campaign.id,placement:this.props.placement}):""},t.prototype.logoComponent=function(){return this.hasImageUrl()?u["default"].createElement(l["default"],this.props.campaign):this.props.logoOnly?this.sponsorNameComponent():""},t.prototype.sponsorNameComponent=function(){return this.hasSponsorName()?u["default"].createElement(h["default"],this.props.campaign):""},t.prototype.preambleTextComponent=function(){return this.hasPreambleText()?u["default"].createElement(d["default"],{text:this.props.preambleText}):""},t.prototype.defaultComponents=function(){return[this.pixelComponent(),this.logoComponent(),this.preambleTextComponent(),this.sponsorNameComponent()]},t.prototype.logoOnlyComponents=function(){return[this.pixelComponent(),this.preambleTextComponent(),this.logoComponent()]},t.prototype.nameOnlyComponents=function(){return[this.pixelComponent(),this.preambleTextComponent(),this.sponsorNameComponent()]},t.prototype.renderEmptyComponent=function(){return u["default"].createElement("span",null)},t.prototype.hasActiveCampaign=function(){return!!(this.props.campaign&&this.props.campaign.id&&this.props.campaign.active)},t.prototype.hasSponsorInfo=function(){return this.hasSponsorName()||this.hasImageUrl()},t.prototype.isRenderable=function(){return this.hasActiveCampaign()&&this.hasSponsorInfo()&&this.hasPreambleText()},t.prototype.childComponents=function(){return this.props.logoOnly?this.logoOnlyComponents():this.props.nameOnly?this.nameOnlyComponents():this.defaultComponents()},t.prototype.wrapChildren=function(e){return this.props.noLink?e:u["default"].createElement("a",{href:this.props.campaign.clickthrough_url},e)},t.prototype.render=function(){var e=this.childComponents();return this.isRenderable()?u["default"].createElement("div",{className:"campaign-display","data-track-label":this.props.campaign.clickthrough_url},u["default"].createElement("div",{className:"inner"},this.wrapChildren(e))):this.renderEmptyComponent()},t}(p.Component);b.defaultProps={logoOnly:!1,nameOnly:!1,noLink:!1},b.propTypes={campaign:p.PropTypes.shape({active:p.PropTypes.bool,clickthrough_url:p.PropTypes.string,id:p.PropTypes.number.isRequired,image_url:p.PropTypes.string,name:p.PropTypes.string.isRequired}),logoCrop:p.PropTypes.string,logoOnly:p.PropTypes.bool,nameOnly:p.PropTypes.bool,noLink:p.PropTypes.bool,placement:p.PropTypes.string,preambleText:p.PropTypes.string},t["default"]=b},222:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){for(var n=Object.getOwnPropertyNames(t),r=0;r<n.length;r++){var o=n[r],i=Object.getOwnPropertyDescriptor(t,o);i&&i.configurable&&void 0===e[o]&&Object.defineProperty(e,o,i)}return e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):o(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var p=n(1),u=r(p),c=function(e){function t(){return i(this,t),a(this,e.apply(this,arguments))}return s(t,e),t.prototype.render=function(){return u["default"].createElement("div",{className:"campaign-display-logo"},u["default"].createElement("img",{src:this.props.image_url}))},t}(p.Component);t["default"]=c,c.propTypes={image_url:p.PropTypes.string.isRequired}},223:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e){return a["default"].createElement("span",{className:"campaign-display-preamble"},e.text)}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o;var i=n(1),a=r(i);o.propTypes={text:i.PropTypes.string.isRequired}},224:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){for(var n=Object.getOwnPropertyNames(t),r=0;r<n.length;r++){var o=n[r],i=Object.getOwnPropertyDescriptor(t,o);i&&i.configurable&&void 0===e[o]&&Object.defineProperty(e,o,i)}return e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):o(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var p=n(1),u=r(p),c=function(e){function t(){return i(this,t),a(this,e.apply(this,arguments))}return s(t,e),t.prototype.render=function(){return u["default"].createElement("span",{className:"campaign-display-sponsor-name"},this.props.name)},t}(p.Component);t["default"]=c,c.propTypes={name:p.PropTypes.string.isRequired}},225:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){for(var n=Object.getOwnPropertyNames(t),r=0;r<n.length;r++){var o=n[r],i=Object.getOwnPropertyDescriptor(t,o);i&&i.configurable&&void 0===e[o]&&Object.defineProperty(e,o,i)}return e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):o(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var p=n(1),u=r(p),c=function(e){function t(){return i(this,t),a(this,e.apply(this,arguments))}return s(t,e),t.prototype.componentDidMount=function(){var e=window.BULBS_ELEMENTS_ADS_MANAGER;"undefined"!=typeof e&&"function"==typeof e.loadAds?e.loadAds(this.refs.container):console.warn("<campaign-display> pixel will not trigger since `window.BULBS_ELEMENTS_ADS_MANAGER` is not configured to an AdsManager instance.")},t.prototype.render=function(){var e={dfp_placement:this.props.placement,dfp_campaign_id:this.props.campaignId};return u["default"].createElement("div",{ref:"container",className:"dfp","data-ad-unit":"campaign-pixel","data-targeting":JSON.stringify(e)})},t}(p.Component);t["default"]=c,c.propTypes={campaignId:p.PropTypes.number.isRequired,placement:p.PropTypes.string.isRequired}}});
//# sourceMappingURL=campaign-display.js.map