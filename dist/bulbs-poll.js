webpackJsonp([7],{0:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){for(var r=Object.getOwnPropertyNames(t),n=0;n<r.length;n++){var a=r[n],l=Object.getOwnPropertyDescriptor(t,a);l&&l.configurable&&void 0===e[a]&&Object.defineProperty(e,a,l)}return e}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):a(e,t))}var u=r(170),i=n(u),c=r(2),d=r(217),f=n(d),p=r(220),b=n(p),w=r(227),v=n(w);r(244);var y=function(e){function t(){return l(this,t),o(this,e.apply(this,arguments))}return s(t,e),t.prototype.initialDispatch=function(){this.store.actions.setSrc(this.props.src),this.store.actions.fetchPollData(this.props.src),this.store.actions.getCachedVoteData(this.props.src)},t.prototype.render=function(){return i["default"].createElement("div",{"data-track-action":"Poll"},i["default"].createElement(v["default"],{data:this.state,actions:this.store.actions}))},t}(f["default"]);y.displayName="BulbsPoll",y.schema=b["default"],y.propTypes={src:u.PropTypes.string.isRequired},(0,c.registerReactElement)("bulbs-poll",y)},220:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(221),l=n(a),o=r(222),s=n(o),u=r(223),i=n(u),c=r(224),d=n(c),f=r(225),p=n(f),b=r(226),w=n(b),v={poll:l["default"],selectedAnswer:s["default"],winningAnswers:i["default"],vote:d["default"],src:p["default"],now:w["default"]};t["default"]=v},221:function(e,t,r){(function(e){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function l(e){return e.published&&(e.published=new Date(e.published)),e.end_date&&(e.end_date=new Date(e.end_date)),e}Object.defineProperty(t,"__esModule",{value:!0});var o=r(176),s=n(o),u={initialState:{data:{answers:[]},requestInFlight:!1},actions:{setPollTotalVotes:function(e,t){return e.data.total_votes=t,e},updateAnswerVoteCount:function(e,t){var r=e.data.answers.find(function(e){return e.sodahead_id===t.answer.id}),n=void 0;return e.data.answers.forEach(function(e,t){e.id===r.id&&(n=t)}),r.total_votes=t.answer.totalVotes,e.data.answers=[].concat(a(e.data.answers.slice(0,n)),[r],a(e.data.answers.slice(n+1))),e},fetchPollData:function(e,t,r){return t||(t=r.src),r.src=t,s["default"].makeRequest(t,{credentials:"include",success:r.actions.fetchPollDataSuccess,failure:r.actions.fetchPollDataFailure,error:r.actions.fetchPollDataError}),e.requestInFlight=!0,e},fetchPollDataSuccess:function(t,r,n){return t.data=l(r),t.requestInFlight=!1,e(function(){n.actions.collectWinningAnswers(n.state.poll.data.answers)}),t},fetchPollDataFailure:function(e,t){return e.requestFailure=t,e.requestInFlight=!1,e},fetchPollDataError:function(e,t){return e.requestError=t,e.requestInFlight=!1,e},resetFetchPollData:function(t,r,n){return t.requestInFlight=!1,delete t.requestFailure,delete t.requestError,e(n.actions.fetchPollData),t}}};t["default"]=u}).call(t,r(3).setImmediate)},222:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={initialState:{},actions:{selectAnswer:function(e,t){return e&&e.id===t.id?{}:t}}};t["default"]=r},223:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={initialState:[],actions:{collectWinningAnswers:function(e){var t=arguments.length<=1||void 0===arguments[1]?[]:arguments[1],r=0,n=[];return t.forEach(function(e){e.total_votes===r?n.push(e):e.total_votes>r&&(r=e.total_votes,n=[e])}),n}}};t["default"]=r},224:function(e,t,r){(function(e){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(e){return"bulbs-poll:"+e+":vote"}Object.defineProperty(t,"__esModule",{value:!0});var l=r(176),o=n(l),s={initialState:{voted:!1},actions:{getCachedVoteData:function(e,t){var r=localStorage.getItem(a(t));return r&&(e.voted=!0,e.data=JSON.parse(r)),e},makeVoteRequest:function(e,t,r){var n=r.state.poll,a="https://onion.sodahead.com/api/polls/"+n.data.sodahead_id+"/vote/";return o["default"].makeRequest(a,{method:"post",headers:{Accept:"application/json","Content-Type":"application/json"},body:"answer="+t.sodahead_id,success:r.actions.voteRequestSuccess,failure:r.actions.voteRequestFailure,error:r.actions.voteRequestError}),e.requestInFlight=!0,e},voteRequestSuccess:function(t,r,n){return localStorage.setItem(a(n.state.src),JSON.stringify(r.vote)),e(function(){n.actions.setPollTotalVotes(r.poll.totalVotes),n.actions.updateAnswerVoteCount(r.vote),n.actions.collectWinningAnswers(n.state.poll.data.answers)}),t.voted=!0,t.data=r.vote,t.requestInFlight=!1,t},voteRequestFailure:function(e,t){return e.requestFailure=t,e.requestInFlight=!1,e},voteRequestError:function(e,t){return e.requestInFlight=!1,e.requestError=t,e},resetVoteRequest:function(e){return e.requestInFlight=!1,delete e.requestFailure,delete e.requestError,e}}};t["default"]=s}).call(t,r(3).setImmediate)},225:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={initialState:"",actions:{setSrc:function(e,t){return t}}};t["default"]=r},226:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={initialState:new Date};t["default"]=r},227:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(e){var t=e.data.poll.data,r=e.data.now,n=!t.id,a=t.published&&t.published<=r,l=t.end_date&&t.end_date<=r,s=e.data.vote.voted;return n?o["default"].createElement(u["default"],null):a?l?o["default"].createElement(b["default"],{data:e.data}):s?o["default"].createElement(f["default"],{data:e.data}):a?o["default"].createElement(c["default"],{actions:e.actions,data:e.data}):void 0:o["default"].createElement(v["default"],null)}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=a;var l=r(170),o=n(l),s=r(228),u=n(s),i=r(229),c=n(i),d=r(238),f=n(d),p=r(242),b=n(p),w=r(243),v=n(w);a.propTypes={actions:l.PropTypes.object.isRequired,data:l.PropTypes.object.isRequired}},228:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(){return o["default"].createElement("div",{className:"bulbs-poll-loading"},"Loading Poll...")}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=a;var l=r(170),o=n(l)},229:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(e){var t=e.actions,r=t.selectAnswer,n=t.makeVoteRequest,a=t.resetFetchPollData,l=t.resetVoteRequest,s=e.data,i=s.poll,d=s.selectedAnswer,p=s.vote;return o["default"].createElement("div",null,o["default"].createElement(u["default"],{poll:i}),o["default"].createElement(b["default"],{error:i.requestError,reset:a},"Could not connect to network when fetching poll data."),o["default"].createElement(b["default"],{error:p.requestError,reset:l},"Could not connect to network when placing your vote."),o["default"].createElement(c["default"],{poll:i,answers:i.data.answers,selectAnswer:r,selectedAnswer:d}),o["default"].createElement(f["default"],{selectedAnswer:d,makeVoteRequest:n}))}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=a;var l=r(170),o=n(l),s=r(230),u=n(s),i=r(231),c=n(i),d=r(236),f=n(d),p=r(237),b=n(p);a.propTypes={actions:l.PropTypes.object.isRequired,data:l.PropTypes.object.isRequired}},230:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(e){var t=e.poll;return o["default"].createElement("header",{className:"bulbs-poll-cover"},o["default"].createElement("h1",{className:"bulbs-poll-cover-title"},t.data.question_text))}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=a;var l=r(170),o=n(l);a.propTypes={poll:l.PropTypes.object.isRequired}},231:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(e){var t=i["default"],r="bulbs-poll-answers";"imageText"===e.poll.data.answer_type&&(t=d["default"],r="bulbs-poll-image-answers");var n=(0,p["default"])(r,{"bulbs-poll-answers-selected":e.selectedAnswer.id});return s["default"].createElement("ul",{className:n},e.answers.map(function(r,n){return s["default"].createElement(t,l({key:n,answer:r},e))}))}Object.defineProperty(t,"__esModule",{value:!0});var l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};t["default"]=a;var o=r(170),s=n(o),u=r(232),i=n(u),c=r(235),d=n(c),f=r(233),p=n(f);a.propTypes={answers:o.PropTypes.array.isRequired,poll:o.PropTypes.object.isRequired,selectAnswer:o.PropTypes.func.isRequired,selectedAnswer:o.PropTypes.object.isRequired}},232:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){for(var r=Object.getOwnPropertyNames(t),n=0;n<r.length;n++){var a=r[n],l=Object.getOwnPropertyDescriptor(t,a);l&&l.configurable&&void 0===e[a]&&Object.defineProperty(e,a,l)}return e}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):a(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var u=r(170),i=n(u),c=r(233),d=n(c),f=r(234),p=n(f),b=function(e){function t(){return l(this,t),o(this,e.apply(this,arguments))}return s(t,e),t.prototype.selectAnswer=function(){this.props.selectAnswer(this.props.answer)},t.prototype.render=function(){var e=this.props,t=e.answer,r=e.selectedAnswer,n=t.id===r.id,a=(0,d["default"])("bulbs-poll-answer",{"bulbs-poll-answer-selected":n});return i["default"].createElement("li",{"data-track-label":"Option",className:a,onClick:this.selectAnswer.bind(this)},i["default"].createElement(p["default"],{isSelected:n}),t.answer_text)},t}(i["default"].Component);t["default"]=b,b.propTypes={answer:u.PropTypes.object.isRequired,selectAnswer:u.PropTypes.func.isRequired,selectedAnswer:u.PropTypes.object}},234:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(e){var t=e.isSelected;return o["default"].createElement("svg",{width:"20px",height:"20px"},o["default"].createElement("circle",{cx:"10",cy:"10",r:"8",fill:"none",stroke:"black",strokeWidth:"2px"}),o["default"].createElement("circle",{cx:"10",cy:"10",r:"5",fill:t?"black":"none"}))}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=a;var l=r(170),o=n(l);a.propTypes={isSelected:l.PropTypes.bool}},235:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){for(var r=Object.getOwnPropertyNames(t),n=0;n<r.length;n++){var a=r[n],l=Object.getOwnPropertyDescriptor(t,a);l&&l.configurable&&void 0===e[a]&&Object.defineProperty(e,a,l)}return e}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):a(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var u=r(170),i=n(u),c=r(233),d=n(c),f=r(234),p=n(f),b=function(e){function t(){return l(this,t),o(this,e.apply(this,arguments))}return s(t,e),t.prototype.selectAnswer=function(){this.props.selectAnswer(this.props.answer)},t.prototype.render=function(){var e=this.props,t=e.answer,r=e.selectedAnswer,n=t.id===r.id,a=(0,d["default"])("bulbs-poll-image-answer",{"bulbs-poll-answer-selected":n});return i["default"].createElement("li",{"data-track-label":"Option",className:a,onClick:this.selectAnswer},i["default"].createElement("img",{src:t.answer_image_url}),i["default"].createElement("div",{className:"answer-image-text"},i["default"].createElement(p["default"],{isSelected:n}),t.answer_text))},t}(i["default"].Component);t["default"]=b,b.propTypes={answer:u.PropTypes.object.isRequired,selectAnswer:u.PropTypes.func.isRequired,selectedAnswer:u.PropTypes.object}},236:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){for(var r=Object.getOwnPropertyNames(t),n=0;n<r.length;n++){var a=r[n],l=Object.getOwnPropertyDescriptor(t,a);l&&l.configurable&&void 0===e[a]&&Object.defineProperty(e,a,l)}return e}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):a(e,t))}Object.defineProperty(t,"__esModule",{value:!0});var u=r(170),i=n(u),c=r(233),d=n(c),f=function(e){function t(){return l(this,t),o(this,e.apply(this,arguments))}return s(t,e),t.prototype.makeVoteRequest=function(){this.props.selectedAnswer&&this.props.makeVoteRequest(this.props.selectedAnswer)},t.prototype.render=function(){var e=this.props.selectedAnswer,t=!0;e&&e.id&&(t=!1);var r=(0,d["default"])("bulbs-poll-vote",{"bulbs-poll-footer":!0});return i["default"].createElement("button",{"data-track-label":"Submit",className:r,onClick:this.makeVoteRequest.bind(this),disabled:t},"Vote")},t}(i["default"].Component);t["default"]=f,f.propTypes={makeVoteRequest:u.PropTypes.func,selectedAnswer:u.PropTypes.object}},237:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(e){var t=e.error,r=e.children,n=e.reset;return t?o["default"].createElement("div",{className:"bulbs-poll-network-error"},o["default"].createElement("p",null,r),o["default"].createElement("button",{onClick:n},"OK")):o["default"].createElement("div",null)}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=a;var l=r(170),o=n(l);a.propTypes={children:l.PropTypes.node,error:l.PropTypes.object,reset:l.PropTypes.func}},238:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(e){var t=(0,u["default"])("bulbs-poll-results",{}),r=e.data,n=r.poll,a=r.winningAnswers,l=r.vote;return o["default"].createElement("div",{className:t},o["default"].createElement(c["default"],{poll:n}),o["default"].createElement(f["default"],{poll:n,winningAnswers:a,vote:l}),o["default"].createElement("div",{className:"bulbs-poll-thank-you bulbs-poll-footer"},"Thanks for voting!"))}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=a;var l=r(170),o=n(l),s=r(233),u=n(s),i=r(230),c=n(i),d=r(239),f=n(d);a.propTypes={data:l.PropTypes.object.isRequired}},239:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(e){var t=e.poll,r=e.winningAnswers,n=e.vote,a=u["default"],l="bulbs-poll-results-list";return"imageText"===e.poll.data.answer_type&&(a=c["default"],l="bulbs-poll-image-results-list"),o["default"].createElement("ul",{className:l},t.data.answers.map(function(e,l){return o["default"].createElement(a,{key:l,answer:e,poll:t,vote:n,winningAnswers:r})}))}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=a;var l=r(170),o=n(l),s=r(240),u=n(s),i=r(241),c=n(i);a.propTypes={poll:l.PropTypes.object.isRequired,vote:l.PropTypes.object.isRequired,winningAnswers:l.PropTypes.array.isRequired}},240:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(e){var t=e.answer,r=e.poll,n=e.vote,a=e.winningAnswers,l=a.find(function(e){return e.sodahead_id===t.sodahead_id}),s=!(!n.data||n.data.answer.id!==t.sodahead_id),i=(0,u["default"])("bulbs-poll-result",{"bulbs-poll-result-winning":l,"bulbs-poll-result-selected":s}),d=t.total_votes,f=void 0;f=r.data.total_votes>1?d/r.data.total_votes*100:100*d;var p=f.toFixed(0)+"%";return o["default"].createElement("li",{className:i},o["default"].createElement("div",{className:"bulbs-poll-answer-bar",style:{width:p}}),o["default"].createElement("div",{className:"bulbs-poll-answer-title"},o["default"].createElement(c["default"],{isSelected:s}),o["default"].createElement("span",{className:"bulbs-poll-answer-text"},t.answer_text),o["default"].createElement("span",{className:"bulbs-poll-answer-result"},p)))}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=a;var l=r(170),o=n(l),s=r(233),u=n(s),i=r(234),c=n(i);a.propTypes={answer:l.PropTypes.object.isRequired,poll:l.PropTypes.object.isRequired,vote:l.PropTypes.object.isRequired,winningAnswers:l.PropTypes.array.isRequired}},241:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(e){var t=e.answer,r=e.poll,n=e.vote,a=e.winningAnswers,l=a.find(function(e){return e.sodahead_id===t.sodahead_id}),s=!(!n.data||n.data.answer.id!==t.sodahead_id),i=(0,u["default"])("bulbs-poll-image-result",{"bulbs-poll-result-winning":l,"bulbs-poll-result-selected":s}),d=t.total_votes,f=void 0;f=r.data.total_votes>1?d/r.data.total_votes*100:100*d;var p=f.toFixed(0)+"%";return o["default"].createElement("li",{className:i},o["default"].createElement("div",{className:"result-image-list-item"},o["default"].createElement("div",{className:"bulbs-poll-image-answer-bar",style:{height:p}}),o["default"].createElement("div",{className:"bulbs-poll-image-answer-title"},o["default"].createElement("img",{src:t.answer_image_url}),o["default"].createElement("div",{className:"answer-image-text"},o["default"].createElement(c["default"],{isSelected:s}),o["default"].createElement("span",{className:"bulbs-poll-image-answer-text"},t.answer_text)))),o["default"].createElement("div",{className:"bulbs-poll-answer-result"},p))}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=a;var l=r(170),o=n(l),s=r(233),u=n(s),i=r(234),c=n(i);a.propTypes={answer:l.PropTypes.object.isRequired,poll:l.PropTypes.object.isRequired,vote:l.PropTypes.object.isRequired,winningAnswers:l.PropTypes.array.isRequired}},242:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(e){var t=e.data,r=t.poll,n=t.winningAnswers,a=t.vote;return o["default"].createElement("div",{className:"bulbs-poll-ended"},o["default"].createElement(u["default"],{poll:r}),o["default"].createElement(c["default"],{poll:r,winningAnswers:n,vote:a}),o["default"].createElement("div",{className:"bulbs-poll-ended-message bulbs-poll-footer"},"Poll Closed"))}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=a;var l=r(170),o=n(l),s=r(230),u=n(s),i=r(239),c=n(i);a.propTypes={data:l.PropTypes.object.isRequired}},243:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(){return o["default"].createElement("div",{className:"bulbs-poll-coming-soon"},o["default"].createElement("div",{className:"bulbs-poll-coming-soon-message"},"Poll Coming Soon"),o["default"].createElement(u["default"],null))}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=a;var l=r(170),o=n(l),s=r(236),u=n(s)},244:function(e,t){}});
//# sourceMappingURL=bulbs-poll.js.map