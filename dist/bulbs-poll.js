webpackJsonp([1],{0:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){for(var r=Object.getOwnPropertyNames(t),n=0;n<r.length;n++){var o=r[n],a=Object.getOwnPropertyDescriptor(t,o);a&&a.configurable&&void 0===e[o]&&Object.defineProperty(e,o,a)}return e}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):o(e,t))}var u=r(172),i=n(u),c=r(2),f=r(192),d=n(f),p=r(195),b=n(p),y=r(203),v=n(y);r(220);var h=function(e){function t(){return a(this,t),l(this,e.apply(this,arguments))}return s(t,e),t.prototype.initialDispatch=function(){this.store.actions.setSrc(this.props.src),this.store.actions.fetchPollData(this.props.src),this.store.actions.getCachedVoteData(this.props.src)},t.prototype.render=function(){return i["default"].createElement("div",{"data-track-action":"Poll"},i["default"].createElement(v["default"],{data:this.state,actions:this.store.actions}))},t}(d["default"]);h.displayName="BulbsPoll",h.schema=b["default"],h.propTypes={src:u.PropTypes.string.isRequired},(0,c.registerReactElement)("bulbs-poll",h)},1:function(e,t,r){"use strict";var n=function(e,t,r,n,o,a,l,s){if(!e){var u;if(void 0===t)u=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var i=[r,n,o,a,l,s],c=0;u=new Error(t.replace(/%s/g,function(){return i[c++]})),u.name="Invariant Violation"}throw u.framesToPop=1,u}};e.exports=n},179:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}var o=r(180),a=n(o),l=r(182),s=n(l),u=r(183),i=n(u),c=r(184),f=n(c),d=r(185),p=n(d);e.exports={makeRequest:a["default"],iterateObject:s["default"],moveChildren:i["default"],copyAttribute:f["default"],supportsCalcInTransform:p["default"]}},180:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];(0,u["default"])(t.success,"makeRequest MUST have a success callback"),(0,u["default"])(t.failure,"makeRequest MUST have a failure callback"),(0,u["default"])(t.error,"makeRequest MUST have an error callback");var r=t.success,n=t.failure,o=t.error,a={success:r,failure:n,error:o},s=(0,l["default"])(t);return delete s.success,delete s.failure,delete s.error,t.redirect||(s.redirect="follow"),fetch(e,s).then(function(e){var t=void 0;return e.status<300?t=e.json().then(a.success):e.status>=400&&(t=e.json().then(a.failure)),t})["catch"](a.error)}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o;var a=r(181),l=n(a),s=r(1),u=n(s)},181:function(e,t){var r=function(){"use strict";function e(t,r,n,o){function l(t,n){if(null===t)return null;if(0==n)return t;var s,f;if("object"!=typeof t)return t;if(e.__isArray(t))s=[];else if(e.__isRegExp(t))s=new RegExp(t.source,a(t)),t.lastIndex&&(s.lastIndex=t.lastIndex);else if(e.__isDate(t))s=new Date(t.getTime());else{if(c&&Buffer.isBuffer(t))return s=new Buffer(t.length),t.copy(s),s;"undefined"==typeof o?(f=Object.getPrototypeOf(t),s=Object.create(f)):(s=Object.create(o),f=o)}if(r){var d=u.indexOf(t);if(-1!=d)return i[d];u.push(t),i.push(s)}for(var p in t){var b;f&&(b=Object.getOwnPropertyDescriptor(f,p)),b&&null==b.set||(s[p]=l(t[p],n-1))}return s}var s;"object"==typeof r&&(n=r.depth,o=r.prototype,s=r.filter,r=r.circular);var u=[],i=[],c="undefined"!=typeof Buffer;return"undefined"==typeof r&&(r=!0),"undefined"==typeof n&&(n=1/0),l(t,n)}function t(e){return Object.prototype.toString.call(e)}function r(e){return"object"==typeof e&&"[object Date]"===t(e)}function n(e){return"object"==typeof e&&"[object Array]"===t(e)}function o(e){return"object"==typeof e&&"[object RegExp]"===t(e)}function a(e){var t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),t}return e.clonePrototype=function(e){if(null===e)return null;var t=function(){};return t.prototype=e,new t},e.__objToStr=t,e.__isDate=r,e.__isArray=n,e.__isRegExp=o,e.__getRegExpFlags=a,e}();"object"==typeof e&&e.exports&&(e.exports=r)},182:function(e,t){"use strict";e.exports=function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=arguments[1];Object.keys(e).forEach(function(r){t(e[r],r)})}},183:function(e,t){"use strict";function r(e,t){Array.prototype.forEach.call(Array.prototype.slice.call(e.childNodes),function(e){return t.appendChild(e)})}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=r},184:function(e,t){"use strict";function r(e,t,r){r.setAttribute(e,t.getAttribute(e))}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=r},185:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=document.createElement("div"),n=r.style;n.transform="translateX(calc(100% - 10px))",t["default"]=""!==n.transform},192:function(e,t,r){(function(e){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){for(var r=Object.getOwnPropertyNames(t),n=0;n<r.length;n++){var o=r[n],a=Object.getOwnPropertyDescriptor(t,o);a&&a.configurable&&void 0===e[o]&&Object.defineProperty(e,o,a)}return e}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):o(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var u=r(172),i=n(u),c=r(193),f=n(c),d=function(t){function r(n){a(this,r);var o=l(this,t.call(this,n));return o.store=o.createStore(),o.store&&(o.store.subscribeComponent(o),e(o.initialDispatch.bind(o))),o}return s(r,t),r.prototype.createStore=function(){var e=void 0;return this.constructor.schema&&(e=new f["default"]({schema:this.constructor.schema})),e},r.prototype.initialDispatch=function(){},r}(i["default"].Component);t["default"]=d}).call(t,r(3).setImmediate)},193:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var o=r(194),a=n(o);t["default"]=a["default"]},194:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e){var t={};return(0,b["default"])(e,function(e,r){t[r]=(0,d["default"])(e.initialState)}),t}function l(e){var t={};return(0,b["default"])(e,function(e,r){(0,b["default"])(e.actions,function(e,n){e.fieldName=r,e.type=n,t[n]=e})}),t}function s(e,t){var r=l(e),n={};return(0,b["default"])(r,function(e,r){n[r]=i.bind(null,t,e)}),n}function u(e){e.components.forEach(function(t){t.setState(e.state)})}function i(e,t,r){y&&console.time("dispatch "+t.type);var n=e.state,o=c({},n),a=n[t.fieldName],l=(0,d["default"])(a);o[t.fieldName]=t(l,r,e),"undefined"!=typeof o[t.fieldName]&&(e.state=o),u(e),y&&(console.groupCollapsed("DISPATCH %c"+t.type+" %c=> %c"+t.fieldName,"color:green","color:auto","color:blue"),console.timeEnd("dispatch "+t.type),console.log("PAYLOAD: ",r),console.log("PREV VALUE: ",a),console.log("NEXT VALUE: ",l),console.log("PREV STORE: ",n),console.log("NEXT STORE: ",o),console.groupEnd())}Object.defineProperty(t,"__esModule",{value:!0});var c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},f=r(181),d=n(f),p=r(182),b=n(p),y=!1,v=function(){function e(t){o(this,e),this.actions=s(t.schema,this),this.state=a(t.schema),this.components=[],y&&console.log("%cCREATED STORE","color:green")}return e.prototype.subscribeComponent=function(e){this.components.push(e),e.state=this.state},e.prototype.unsubscribeComponent=function(e){var t=this.components.indexOf(e);t>-1&&this.components.splice(t,1)},e}();t["default"]=v},195:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var o=r(196),a=n(o),l=r(198),s=n(l),u=r(199),i=n(u),c=r(200),f=n(c),d=r(201),p=n(d),b=r(202),y=n(b),v={poll:a["default"],selectedAnswer:s["default"],winningAnswers:i["default"],vote:f["default"],src:p["default"],now:y["default"]};t["default"]=v},196:function(e,t,r){(function(e){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function a(e){return e.published&&(e.published=new Date(e.published)),e.end_date&&(e.end_date=new Date(e.end_date)),e}Object.defineProperty(t,"__esModule",{value:!0});var l=r(197),s=n(l),u=r(179),i=n(u),c={initialState:{data:{answers:[]},requestInFlight:!1},actions:{setPollTotalVotes:function(e,t){return e.data.total_votes=t,e},updateAnswerVoteCount:function(e,t){var r=(0,s["default"])(e.data.answers,function(e){return e.sodahead_id===t.answer.id}),n=void 0;return e.data.answers.forEach(function(e,t){e.id===r.id&&(n=t)}),r.total_votes=t.answer.totalVotes,e.data.answers=[].concat(o(e.data.answers.slice(0,n)),[r],o(e.data.answers.slice(n+1))),e},fetchPollData:function(e,t,r){return t||(t=r.src),r.src=t,i["default"].makeRequest(t,{credentials:"include",success:r.actions.fetchPollDataSuccess,failure:r.actions.fetchPollDataFailure,error:r.actions.fetchPollDataError}),e.requestInFlight=!0,e},fetchPollDataSuccess:function(t,r,n){return t.data=a(r),t.requestInFlight=!1,e(function(){n.actions.collectWinningAnswers(n.state.poll.data.answers)}),t},fetchPollDataFailure:function(e,t){return e.requestFailure=t,e.requestInFlight=!1,e},fetchPollDataError:function(e,t){return e.requestError=t,e.requestInFlight=!1,e},resetFetchPollData:function(t,r,n){return t.requestInFlight=!1,delete t.requestFailure,delete t.requestError,e(n.actions.fetchPollData),t}}};t["default"]=c}).call(t,r(3).setImmediate)},197:function(e,t){"use strict";function r(e,t,r){if("function"==typeof Array.prototype.find)return e.find(t,r);r=r||this;var n,o=e.length;if("function"!=typeof t)throw new TypeError(t+" is not a function");for(n=0;o>n;n++)if(t.call(r,e[n],n,e))return e[n]}e.exports=r},198:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={initialState:{},actions:{selectAnswer:function(e,t){return e&&e.id===t.id?{}:t}}};t["default"]=r},199:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={initialState:[],actions:{collectWinningAnswers:function(e){var t=arguments.length<=1||void 0===arguments[1]?[]:arguments[1],r=0,n=[];return t.forEach(function(e){e.total_votes===r?n.push(e):e.total_votes>r&&(r=e.total_votes,n=[e])}),n}}};t["default"]=r},200:function(e,t,r){(function(e){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e){return"bulbs-poll:"+e+":vote"}Object.defineProperty(t,"__esModule",{value:!0});var a=r(179),l=n(a),s={initialState:{voted:!1},actions:{getCachedVoteData:function(e,t){var r=localStorage.getItem(o(t));return r&&(e.voted=!0,e.data=JSON.parse(r)),e},makeVoteRequest:function(e,t,r){var n=r.state.poll,o="https://onion.sodahead.com/api/polls/"+n.data.sodahead_id+"/vote/";return l["default"].makeRequest(o,{method:"post",headers:{Accept:"application/json","Content-Type":"application/json"},body:"answer="+t.sodahead_id,success:r.actions.voteRequestSuccess,failure:r.actions.voteRequestFailure,error:r.actions.voteRequestError}),e.requestInFlight=!0,e},voteRequestSuccess:function(t,r,n){return localStorage.setItem(o(n.state.src),JSON.stringify(r.vote)),e(function(){n.actions.setPollTotalVotes(r.poll.totalVotes),n.actions.updateAnswerVoteCount(r.vote),n.actions.collectWinningAnswers(n.state.poll.data.answers)}),t.voted=!0,t.data=r.vote,t.requestInFlight=!1,t},voteRequestFailure:function(e,t){return e.requestFailure=t,e.requestInFlight=!1,e},voteRequestError:function(e,t){return e.requestInFlight=!1,e.requestError=t,e},resetVoteRequest:function(e){return e.requestInFlight=!1,delete e.requestFailure,delete e.requestError,e}}};t["default"]=s}).call(t,r(3).setImmediate)},201:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={initialState:"",actions:{setSrc:function(e,t){return t}}};t["default"]=r},202:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={initialState:new Date};t["default"]=r},203:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e){var t=e.data.poll.data,r=e.data.now,n=!t.id,o=t.published&&t.published<=r,a=t.end_date&&t.end_date<=r,s=e.data.vote.voted;return n?l["default"].createElement(u["default"],null):o?a?l["default"].createElement(b["default"],{data:e.data}):s?l["default"].createElement(d["default"],{data:e.data}):o?l["default"].createElement(c["default"],{actions:e.actions,data:e.data}):void 0:l["default"].createElement(v["default"],null)}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o;var a=r(172),l=n(a),s=r(204),u=n(s),i=r(205),c=n(i),f=r(214),d=n(f),p=r(218),b=n(p),y=r(219),v=n(y);o.propTypes={actions:a.PropTypes.object.isRequired,data:a.PropTypes.object.isRequired}},204:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(){return l["default"].createElement("div",{className:"bulbs-poll-loading"},"Loading Poll...")}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o;var a=r(172),l=n(a)},205:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e){var t=e.actions,r=t.selectAnswer,n=t.makeVoteRequest,o=t.resetFetchPollData,a=t.resetVoteRequest,s=e.data,i=s.poll,f=s.selectedAnswer,p=s.vote;return l["default"].createElement("div",null,l["default"].createElement(u["default"],{poll:i}),l["default"].createElement(b["default"],{error:i.requestError,reset:o},"Could not connect to network when fetching poll data."),l["default"].createElement(b["default"],{error:p.requestError,reset:a},"Could not connect to network when placing your vote."),l["default"].createElement(c["default"],{poll:i,answers:i.data.answers,selectAnswer:r,selectedAnswer:f}),l["default"].createElement(d["default"],{selectedAnswer:f,makeVoteRequest:n}))}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o;var a=r(172),l=n(a),s=r(206),u=n(s),i=r(207),c=n(i),f=r(212),d=n(f),p=r(213),b=n(p);o.propTypes={actions:a.PropTypes.object.isRequired,data:a.PropTypes.object.isRequired}},206:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e){var t=e.poll;return l["default"].createElement("header",{className:"bulbs-poll-cover"},l["default"].createElement("h1",{className:"bulbs-poll-cover-title"},t.data.question_text))}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o;var a=r(172),l=n(a);o.propTypes={poll:a.PropTypes.object.isRequired}},207:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e){var t=i["default"],r="bulbs-poll-answers";"imageText"===e.poll.data.answer_type&&(t=f["default"],r="bulbs-poll-image-answers");var n=(0,p["default"])(r,{"bulbs-poll-answers-selected":e.selectedAnswer.id});return s["default"].createElement("ul",{className:n},e.answers.map(function(r,n){return s["default"].createElement(t,a({key:n,answer:r},e))}))}Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};t["default"]=o;var l=r(172),s=n(l),u=r(208),i=n(u),c=r(211),f=n(c),d=r(209),p=n(d);o.propTypes={answers:l.PropTypes.array.isRequired,poll:l.PropTypes.object.isRequired,selectAnswer:l.PropTypes.func.isRequired,selectedAnswer:l.PropTypes.object.isRequired}},208:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){for(var r=Object.getOwnPropertyNames(t),n=0;n<r.length;n++){var o=r[n],a=Object.getOwnPropertyDescriptor(t,o);a&&a.configurable&&void 0===e[o]&&Object.defineProperty(e,o,a)}return e}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):o(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var u=r(172),i=n(u),c=r(209),f=n(c),d=r(210),p=n(d),b=function(e){function t(){return a(this,t),l(this,e.apply(this,arguments))}return s(t,e),t.prototype.selectAnswer=function(){this.props.selectAnswer(this.props.answer)},t.prototype.render=function(){var e=this.props,t=e.answer,r=e.selectedAnswer,n=t.id===r.id,o=(0,f["default"])("bulbs-poll-answer",{"bulbs-poll-answer-selected":n});return i["default"].createElement("li",{"data-track-label":"Option",className:o,onClick:this.selectAnswer},i["default"].createElement(p["default"],{isSelected:n}),t.answer_text)},t}(i["default"].Component);t["default"]=b,b.propTypes={answer:u.PropTypes.object.isRequired,selectAnswer:u.PropTypes.func.isRequired,selectedAnswer:u.PropTypes.object}},209:function(e,t,r){var n,o;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
!function(){"use strict";function r(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=typeof n;if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n))e.push(r.apply(null,n));else if("object"===o)for(var l in n)a.call(n,l)&&n[l]&&e.push(l)}}return e.join(" ")}var a={}.hasOwnProperty;"undefined"!=typeof e&&e.exports?e.exports=r:(n=[],o=function(){return r}.apply(t,n),!(void 0!==o&&(e.exports=o)))}()},210:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e){var t=e.isSelected;return l["default"].createElement("svg",{width:"20px",height:"20px"},l["default"].createElement("circle",{cx:"10",cy:"10",r:"8",fill:"none",stroke:"black",strokeWidth:"2px"}),l["default"].createElement("circle",{cx:"10",cy:"10",r:"5",fill:t?"black":"none"}))}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o;var a=r(172),l=n(a);o.propTypes={isSelected:a.PropTypes.bool}},211:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){for(var r=Object.getOwnPropertyNames(t),n=0;n<r.length;n++){var o=r[n],a=Object.getOwnPropertyDescriptor(t,o);a&&a.configurable&&void 0===e[o]&&Object.defineProperty(e,o,a)}return e}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):o(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var u=r(172),i=n(u),c=r(209),f=n(c),d=r(210),p=n(d),b=function(e){function t(){return a(this,t),l(this,e.apply(this,arguments))}return s(t,e),t.prototype.selectAnswer=function(){this.props.selectAnswer(this.props.answer)},t.prototype.render=function(){var e=this.props,t=e.answer,r=e.selectedAnswer,n=t.id===r.id,o=(0,f["default"])("bulbs-poll-image-answer",{"bulbs-poll-answer-selected":n});return i["default"].createElement("li",{"data-track-label":"Option",className:o,onClick:this.selectAnswer},i["default"].createElement("img",{src:t.answer_image_url}),i["default"].createElement("div",{className:"answer-image-text"},i["default"].createElement(p["default"],{isSelected:n}),t.answer_text))},t}(i["default"].Component);t["default"]=b,b.propTypes={answer:u.PropTypes.object.isRequired,selectAnswer:u.PropTypes.func.isRequired,selectedAnswer:u.PropTypes.object}},212:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){for(var r=Object.getOwnPropertyNames(t),n=0;n<r.length;n++){var o=r[n],a=Object.getOwnPropertyDescriptor(t,o);a&&a.configurable&&void 0===e[o]&&Object.defineProperty(e,o,a)}return e}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):o(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var u=r(172),i=n(u),c=r(209),f=n(c),d=function(e){function t(){return a(this,t),l(this,e.apply(this,arguments))}return s(t,e),t.prototype.makeVoteRequest=function(){this.props.selectedAnswer&&this.props.makeVoteRequest(this.props.selectedAnswer)},t.prototype.render=function(){var e=this.props.selectedAnswer,t=!0;e&&e.id&&(t=!1);var r=(0,f["default"])("bulbs-poll-vote",{"bulbs-poll-footer":!0});return i["default"].createElement("button",{"data-track-label":"Submit",className:r,onClick:this.makeVoteRequest,disabled:t},"Vote")},t}(i["default"].Component);t["default"]=d,d.propTypes={makeVoteRequest:u.PropTypes.func,selectedAnswer:u.PropTypes.object}},213:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e){var t=e.error,r=e.children,n=e.reset;return t?l["default"].createElement("div",{className:"bulbs-poll-network-error"},l["default"].createElement("p",null,r),l["default"].createElement("button",{onClick:n},"OK")):l["default"].createElement("div",null)}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o;var a=r(172),l=n(a);o.propTypes={children:a.PropTypes.node,error:a.PropTypes.object,reset:a.PropTypes.func}},214:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e){var t=(0,u["default"])("bulbs-poll-results",{}),r=e.data,n=r.poll,o=r.winningAnswers,a=r.vote;return l["default"].createElement("div",{className:t},l["default"].createElement(c["default"],{poll:n}),l["default"].createElement(d["default"],{poll:n,winningAnswers:o,vote:a}),l["default"].createElement("div",{className:"bulbs-poll-thank-you bulbs-poll-footer"},"Thanks for voting!"))}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o;var a=r(172),l=n(a),s=r(209),u=n(s),i=r(206),c=n(i),f=r(215),d=n(f);o.propTypes={data:a.PropTypes.object.isRequired}},215:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e){var t=e.poll,r=e.winningAnswers,n=e.vote,o=u["default"],a="bulbs-poll-results-list";return"imageText"===e.poll.data.answer_type&&(o=c["default"],a="bulbs-poll-image-results-list"),l["default"].createElement("ul",{className:a},t.data.answers.map(function(e,a){return l["default"].createElement(o,{key:a,answer:e,poll:t,vote:n,winningAnswers:r})}))}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o;var a=r(172),l=n(a),s=r(216),u=n(s),i=r(217),c=n(i);o.propTypes={poll:a.PropTypes.object.isRequired,vote:a.PropTypes.object.isRequired,winningAnswers:a.PropTypes.array.isRequired}},216:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e){var t=e.answer,r=e.poll,n=e.vote,o=e.winningAnswers,a=(0,d["default"])(o,function(e){return e.sodahead_id===t.sodahead_id}),s=!(!n.data||n.data.answer.id!==t.sodahead_id),i=(0,u["default"])("bulbs-poll-result",{"bulbs-poll-result-winning":a,"bulbs-poll-result-selected":s}),f=t.total_votes,p=void 0;p=r.data.total_votes>1?f/r.data.total_votes*100:100*f;var b=p.toFixed(0)+"%";return l["default"].createElement("li",{className:i},l["default"].createElement("div",{className:"bulbs-poll-answer-bar",style:{width:b}}),l["default"].createElement("div",{className:"bulbs-poll-answer-title"},l["default"].createElement(c["default"],{isSelected:s}),l["default"].createElement("span",{className:"bulbs-poll-answer-text"},t.answer_text),l["default"].createElement("span",{className:"bulbs-poll-answer-result"},b)))}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o;var a=r(172),l=n(a),s=r(209),u=n(s),i=r(210),c=n(i),f=r(197),d=n(f);o.propTypes={answer:a.PropTypes.object.isRequired,poll:a.PropTypes.object.isRequired,vote:a.PropTypes.object.isRequired,winningAnswers:a.PropTypes.array.isRequired}},217:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e){var t=e.answer,r=e.poll,n=e.vote,o=e.winningAnswers,a=(0,d["default"])(o,function(e){return e.sodahead_id===t.sodahead_id}),s=!(!n.data||n.data.answer.id!==t.sodahead_id),i=(0,u["default"])("bulbs-poll-image-result",{"bulbs-poll-result-winning":a,"bulbs-poll-result-selected":s}),f=t.total_votes,p=void 0;p=r.data.total_votes>1?f/r.data.total_votes*100:100*f;var b=p.toFixed(0)+"%";return l["default"].createElement("li",{className:i},l["default"].createElement("div",{className:"result-image-list-item"},l["default"].createElement("div",{className:"bulbs-poll-image-answer-bar",style:{height:b}}),l["default"].createElement("div",{className:"bulbs-poll-image-answer-title"},l["default"].createElement("img",{src:t.answer_image_url}),l["default"].createElement("div",{className:"answer-image-text"},l["default"].createElement(c["default"],{isSelected:s}),l["default"].createElement("span",{className:"bulbs-poll-image-answer-text"},t.answer_text)))),l["default"].createElement("div",{className:"bulbs-poll-answer-result"},b))}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o;var a=r(172),l=n(a),s=r(209),u=n(s),i=r(210),c=n(i),f=r(197),d=n(f);o.propTypes={answer:a.PropTypes.object.isRequired,poll:a.PropTypes.object.isRequired,vote:a.PropTypes.object.isRequired,winningAnswers:a.PropTypes.array.isRequired}},218:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e){var t=e.data,r=t.poll,n=t.winningAnswers,o=t.vote;return l["default"].createElement("div",{className:"bulbs-poll-ended"},l["default"].createElement(u["default"],{poll:r}),l["default"].createElement(c["default"],{poll:r,winningAnswers:n,vote:o}),l["default"].createElement("div",{className:"bulbs-poll-ended-message bulbs-poll-footer"},"Poll Closed"))}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o;var a=r(172),l=n(a),s=r(206),u=n(s),i=r(215),c=n(i);o.propTypes={data:a.PropTypes.object.isRequired}},219:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(){return l["default"].createElement("div",{className:"bulbs-poll-coming-soon"},l["default"].createElement("div",{className:"bulbs-poll-coming-soon-message"},"Poll Coming Soon"),l["default"].createElement(u["default"],null))}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o;var a=r(172),l=n(a),s=r(212),u=n(s)},220:function(e,t){}});
//# sourceMappingURL=bulbs-poll.js.map