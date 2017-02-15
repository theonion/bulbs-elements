webpackJsonp([31],{0:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){for(var n=Object.getOwnPropertyNames(t),r=0;r<n.length;r++){var o=n[r],i=Object.getOwnPropertyDescriptor(t,o);i&&i.configurable&&void 0===e[o]&&Object.defineProperty(e,o,i)}return e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function p(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):o(e,t))}Object.defineProperty(t,"__esModule",{value:!0}),t.displayPropType=void 0;var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},c=n(183),u=r(c),l=n(36),f=r(l),y=n(260),d=r(y),m=n(1);n(486);var h=n(488),g=r(h),b=n(489),O=r(b),P=n(490),v=r(P),w=function(e){function t(n){return i(this,t),(0,f.default)(!!n.placement,"campaign-display component requires a placement"),p(this,e.call(this,n))}return a(t,e),t.prototype.initialDispatch=function(){this.props.src&&this.store.actions.fetchCampaign(this.props.src)},t.prototype.componentDidUpdate=function(e){this.props.src!==e.src&&(this.store.actions.handleFetchComplete(null),this.initialDispatch())},t.prototype.render=function(){if(this.state.campaignRequest.networkError)return u.default.createElement("span",null);var e=s({},this.state,this.props,{nameOnly:"string"==typeof this.props.nameOnly,logoOnly:"string"==typeof this.props.logoOnly,noPixel:"string"==typeof this.props.noPixel,noLink:"string"==typeof this.props.noLink});return u.default.createElement(v.default,e)},t}(d.default);s(w,{displayName:"CampaignDisplay",schema:{campaign:g.default,campaignRequest:O.default},propTypes:{logoOnly:c.PropTypes.string,nameOnly:c.PropTypes.string,noLink:c.PropTypes.string,noPixel:c.PropTypes.string,placement:c.PropTypes.string.isRequired,preambleText:c.PropTypes.string.isRequired,src:c.PropTypes.string.isRequired}}),(0,m.registerReactElement)("campaign-display",w),t.default=w;t.displayPropType=w.propTypes.display},486:function(e,t){},488:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={actions:{handleFetchComplete:function(e,t){return t}}};t.default=n},489:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(185),o={initialState:{requestInFlight:!1},actions:{fetchCampaign:function(e,t,n){return e.requestInFlight=!0,(0,r.makeRequest)(t,{credentials:"include",success:function(e){n.actions.fetchCampaignSuccess(e),n.actions.handleFetchComplete(e)},failure:n.actions.fetchCampaignFailure,error:n.actions.fetchCampaignError}),e},fetchCampaignSuccess:function(e){e.requestInFlight=!1},fetchCampaignFailure:function(e,t){return e.requestInFlight=!1,e.requestFailure=t,e},fetchCampaignError:function(e,t){return e.requestInFlight=!1,e.networkError=t,e}}};t.default=o},490:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){for(var n=Object.getOwnPropertyNames(t),r=0;r<n.length;r++){var o=n[r],i=Object.getOwnPropertyDescriptor(t,o);i&&i.configurable&&void 0===e[o]&&Object.defineProperty(e,o,i)}return e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function p(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):o(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var s=n(183),c=r(s),u=n(491),l=r(u),f=n(493),y=r(f),d=n(494),m=r(d),h=n(495),g=r(h),b=n(496),O=r(b),P=function(e){function t(n){return i(this,t),p(this,e.call(this,n))}return a(t,e),t.prototype.hasImageUrl=function(){return!!this.props.campaign.image_url},t.prototype.hasValidCampaign=function(){return!!this.props.campaign},t.prototype.pixelComponent=function(){return this.props.noPixel||!this.props.campaign.active?"":c.default.createElement(O.default,{campaignId:this.props.campaign.id,placement:this.props.placement})},t.prototype.logoComponent=function(){return this.props.logoOnly&&!this.hasImageUrl()?this.sponsorNameComponent():c.default.createElement(y.default,this.props.campaign)},t.prototype.sponsorNameComponent=function(){return c.default.createElement(g.default,this.props.campaign)},t.prototype.preambleTextComponent=function(){return c.default.createElement(m.default,{text:this.props.preambleText})},t.prototype.defaultComponents=function(){return(0,l.default)({dfpPixel:this.pixelComponent(),logo:this.logoComponent(),preamble:this.preambleTextComponent(),sponsorName:this.sponsorNameComponent()})},t.prototype.logoOnlyComponents=function(){return(0,l.default)({dfpPixel:this.pixelComponent(),preamble:this.preambleTextComponent(),logo:this.logoComponent()})},t.prototype.nameOnlyComponents=function(){return(0,l.default)({dfpPixel:this.pixelComponent(),preamble:this.preambleTextComponent(),sponsorName:this.sponsorNameComponent()})},t.prototype.childComponents=function(){var e=void 0;return e=this.props.logoOnly?this.logoOnlyComponents():this.props.nameOnly?this.nameOnlyComponents():this.defaultComponents(),this.props.noLink?e:c.default.createElement("a",{href:this.props.campaign.clickthrough_url},e)},t.prototype.render=function(){return this.hasValidCampaign()?c.default.createElement("div",{className:"campaign-display","data-track-label":this.props.campaign.clickthrough_url},c.default.createElement("div",{className:"inner"},this.childComponents())):c.default.createElement("div",{className:"inactive-campaign"})},t}(s.Component);P.defaultProps={logoOnly:!1,nameOnly:!1,noLink:!1,noPixel:!1},P.propTypes={campaign:s.PropTypes.shape({active:s.PropTypes.bool.isRequired,clickthrough_url:s.PropTypes.string.isRequired,id:s.PropTypes.number.isRequired,image_url:s.PropTypes.string,name:s.PropTypes.string.isRequired}),logoOnly:s.PropTypes.bool,nameOnly:s.PropTypes.bool,noLink:s.PropTypes.bool,noPixel:s.PropTypes.bool,placement:s.PropTypes.string.isRequired,preambleText:s.PropTypes.string.isRequired},t.default=P},491:function(e,t,n){e.exports=n(492).create},492:function(e,t,n){"use strict";var r=n(100),o=n(98),i=n(101),p=n(22),a=(n(14),n(21),{create:function(e){if("object"!=typeof e||!e||Array.isArray(e))return e;if(i.isValidElement(e))return e;1===e.nodeType?r("0"):void 0;var t=[];for(var n in e)o.mapIntoWithKeyPrefixInternal(e[n],t,n,p.thatReturnsArgument);return t}});e.exports=a},493:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){for(var n=Object.getOwnPropertyNames(t),r=0;r<n.length;r++){var o=n[r],i=Object.getOwnPropertyDescriptor(t,o);i&&i.configurable&&void 0===e[o]&&Object.defineProperty(e,o,i)}return e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function p(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):o(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var s=n(183),c=r(s),u=function(e){function t(){return i(this,t),p(this,e.apply(this,arguments))}return a(t,e),t.prototype.render=function(){return c.default.createElement("div",{className:"campaign-display-logo"},c.default.createElement("img",{src:this.props.image_url}))},t}(s.Component);t.default=u,u.propTypes={image_url:s.PropTypes.string.isRequired,noLink:s.PropTypes.bool}},494:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){return p.default.createElement("span",{className:"campaign-display-preamble"},e.text)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o;var i=n(183),p=r(i);o.propTypes={text:i.PropTypes.string.isRequired}},495:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){for(var n=Object.getOwnPropertyNames(t),r=0;r<n.length;r++){var o=n[r],i=Object.getOwnPropertyDescriptor(t,o);i&&i.configurable&&void 0===e[o]&&Object.defineProperty(e,o,i)}return e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function p(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):o(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var s=n(183),c=r(s),u=function(e){function t(){return i(this,t),p(this,e.apply(this,arguments))}return a(t,e),t.prototype.render=function(){return c.default.createElement("span",{className:"campaign-display-sponsor-name"},this.props.name)},t}(s.Component);t.default=u,u.propTypes={name:s.PropTypes.string.isRequired,noLink:s.PropTypes.bool}},496:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){for(var n=Object.getOwnPropertyNames(t),r=0;r<n.length;r++){var o=n[r],i=Object.getOwnPropertyDescriptor(t,o);i&&i.configurable&&void 0===e[o]&&Object.defineProperty(e,o,i)}return e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function p(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):o(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var s=n(183),c=r(s),u=function(e){function t(){return i(this,t),p(this,e.apply(this,arguments))}return a(t,e),t.prototype.componentDidMount=function(){var e=window.BULBS_ELEMENTS_ADS_MANAGER;"undefined"!=typeof e&&"function"==typeof e.loadAds?e.loadAds(this.refs.container):console.warn("<campaign-display> pixel will not trigger since `window.BULBS_ELEMENTS_ADS_MANAGER` is not configured to an AdsManager instance.")},t.prototype.render=function(){var e={dfp_placement:this.props.placement,dfp_campaign_id:this.props.campaignId};return c.default.createElement("div",{ref:"container",className:"dfp","data-ad-unit":"campaign-pixel","data-targeting":JSON.stringify(e)})},t}(s.Component);t.default=u,u.displayName="DfpPixel",u.propTypes={campaignId:s.PropTypes.number.isRequired,placement:s.PropTypes.string.isRequired}}});
//# sourceMappingURL=campaign-display.js.map