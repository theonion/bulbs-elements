webpackJsonp([10],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';
	
	var _index = __webpack_require__(238);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _index3 = __webpack_require__(244);
	
	var _index4 = _interopRequireDefault(_index3);
	
	var _react2 = __webpack_require__(50);
	
	var _react3 = _interopRequireDefault(_react2);
	
	var _index5 = __webpack_require__(245);
	
	var _index6 = _interopRequireDefault(_index5);
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _register = __webpack_require__(288);
	
	var _register2 = _interopRequireDefault(_register);
	
	var _bulbsElement = __webpack_require__(299);
	
	var _bulbsElement2 = _interopRequireDefault(_bulbsElement);
	
	var _store = __webpack_require__(234);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _question = __webpack_require__(230);
	
	var _question2 = _interopRequireDefault(_question);
	
	var _results = __webpack_require__(300);
	
	var _results2 = _interopRequireDefault(_results);
	
	__webpack_require__(301);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _components = {
	  BulbsPoll: {
	    displayName: 'BulbsPoll'
	  }
	};
	
	var _UsersCollinmillerCodeBulbsElementsNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
	  filename: '/Users/collinmiller/Code/bulbs-elements/elements/bulbs-poll/bulbs-poll.js',
	  components: _components,
	  locals: [module],
	  imports: [_react3.default]
	});
	
	var _UsersCollinmillerCodeBulbsElementsNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
	  filename: '/Users/collinmiller/Code/bulbs-elements/elements/bulbs-poll/bulbs-poll.js',
	  components: _components,
	  locals: [],
	  imports: [_react3.default, _index2.default]
	});
	
	function _wrapComponent(id) {
	  return function (Component) {
	    return _UsersCollinmillerCodeBulbsElementsNode_modulesReactTransformHmrLibIndexJs2(_UsersCollinmillerCodeBulbsElementsNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
	  };
	}
	
	var BulbsPoll = _wrapComponent('BulbsPoll')(function (_BulbsElement) {
	  _inherits(BulbsPoll, _BulbsElement);
	
	  function BulbsPoll() {
	    _classCallCheck(this, BulbsPoll);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(BulbsPoll).apply(this, arguments));
	  }
	
	  _createClass(BulbsPoll, [{
	    key: 'initialDispatch',
	    value: function initialDispatch() {
	      this.store.actions.fetchPollData(this.props.src);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react3.default.createElement(_question2.default, {
	        actions: this.store.actions,
	        data: this.state
	      });
	    }
	  }]);
	
	  return BulbsPoll;
	}(_bulbsElement2.default));
	
	BulbsPoll.displayName = 'BulbsPoll';
	
	BulbsPoll.store = _store2.default;
	
	BulbsPoll.propTypes = {
	  src: _react2.PropTypes.string.isRequired
	};
	
	(0, _register2.default)('bulbs-poll', BulbsPoll);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(237)(module)))

/***/ },

/***/ 49:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Answer;
	
	var _react = __webpack_require__(50);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(206);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Answer(props) {
	  var answer = props.answer;
	  var selectAnswer = props.selectAnswer;
	  var selectedAnswer = props.selectedAnswer;
	
	  var isSelected = answer.id === selectedAnswer.id;
	  var className = (0, _classnames2.default)('bulbs-poll-answer', {
	    selected: isSelected
	  });
	
	  return _react2.default.createElement(
	    'li',
	    {
	      className: className,
	      onClick: selectAnswer.bind(null, answer)
	    },
	    _react2.default.createElement(
	      'svg',
	      { width: '20px', height: '20px' },
	      _react2.default.createElement('circle', { cx: '10', cy: '10', r: '8', fill: 'none', stroke: 'black', strokeWidth: '2px' }),
	      _react2.default.createElement('circle', { cx: '10', cy: '10', r: '5', fill: isSelected ? 'black' : 'none' })
	    ),
	    answer.answer_text
	  );
	}
	
	Answer.propTypes = {
	  answer: _react.PropTypes.object.isRequired,
	  selectAnswer: _react.PropTypes.func.isRequired,
	  selectedAnswer: _react.PropTypes.object
	};

/***/ },

/***/ 227:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Answers;
	
	var _react = __webpack_require__(50);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _answer = __webpack_require__(49);
	
	var _answer2 = _interopRequireDefault(_answer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Answers(props) {
	  return _react2.default.createElement(
	    'ul',
	    { className: 'bulbs-poll-answers' },
	    props.answers.map(function (answer, index) {
	      return _react2.default.createElement(_answer2.default, _extends({
	        key: index,
	        answer: answer
	      }, props));
	    })
	  );
	}
	
	Answers.propTypes = {
	  answers: _react.PropTypes.array.isRequired,
	  selectAnswer: _react.PropTypes.func.isRequired,
	  selectedAnswer: _react.PropTypes.object
	};

/***/ },

/***/ 228:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Cover;
	
	var _react = __webpack_require__(50);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _croppedImage = __webpack_require__(229);
	
	var _croppedImage2 = _interopRequireDefault(_croppedImage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Cover(props) {
	  var poll = props.poll;
	
	  return _react2.default.createElement(
	    'header',
	    { className: 'bulbs-poll-cover' },
	    poll.data.thumbnail ? _react2.default.createElement(_croppedImage2.default, { image: poll.data.thumbnail }) : undefined,
	    _react2.default.createElement(
	      'h1',
	      { className: 'bulbs-poll-cover-title' },
	      poll.data.question_text
	    )
	  );
	}
	
	Cover.propTypes = {
	  poll: _react.PropTypes.object.isRequired
	};

/***/ },

/***/ 230:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RequestError = RequestError;
	exports.default = Question;
	
	var _react = __webpack_require__(50);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _cover = __webpack_require__(228);
	
	var _cover2 = _interopRequireDefault(_cover);
	
	var _answers = __webpack_require__(227);
	
	var _answers2 = _interopRequireDefault(_answers);
	
	var _voteButton = __webpack_require__(231);
	
	var _voteButton2 = _interopRequireDefault(_voteButton);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function RequestError(_ref) {
	  var error = _ref.error;
	  var children = _ref.children;
	  var reset = _ref.reset;
	
	  if (error) {
	    return _react2.default.createElement(
	      'div',
	      { className: 'bulbs-poll-network-error' },
	      _react2.default.createElement(
	        'p',
	        null,
	        children
	      ),
	      _react2.default.createElement(
	        'button',
	        { onClick: reset },
	        'OK'
	      )
	    );
	  } else {
	    return _react2.default.createElement('div', null);
	  }
	}
	
	function Question(props) {
	  var _props$actions = props.actions;
	  var selectAnswer = _props$actions.selectAnswer;
	  var makeVoteRequest = _props$actions.makeVoteRequest;
	  var resetFetchPollData = _props$actions.resetFetchPollData;
	  var resetVoteRequest = _props$actions.resetVoteRequest;
	  var _props$data = props.data;
	  var poll = _props$data.poll;
	  var selectedAnswer = _props$data.selectedAnswer;
	  var vote = _props$data.vote;
	
	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(_cover2.default, { poll: poll }),
	    _react2.default.createElement(
	      RequestError,
	      {
	        error: poll.requestError,
	        reset: resetFetchPollData
	      },
	      'Could not connect to network when fetching poll data.'
	    ),
	    _react2.default.createElement(
	      RequestError,
	      {
	        error: vote.requestError,
	        reset: resetVoteRequest
	      },
	      'Could not connect to network when placing your vote.'
	    ),
	    _react2.default.createElement(_answers2.default, {
	      answers: poll.data.answers,
	      selectAnswer: selectAnswer,
	      selectedAnswer: selectedAnswer
	    }),
	    _react2.default.createElement(_voteButton2.default, {
	      selectedAnswer: selectedAnswer,
	      makeVoteRequest: makeVoteRequest
	    })
	  );
	}

/***/ },

/***/ 231:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = VoteButton;
	
	var _react = __webpack_require__(50);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(206);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function VoteButton(props) {
	  var selectedAnswer = props.selectedAnswer;
	
	  function handleClick() {
	    if (selectedAnswer) {
	      props.makeVoteRequest(selectedAnswer);
	    }
	  }
	
	  var classes = (0, _classnames2.default)('bulbs-poll-vote', {});
	
	  return _react2.default.createElement(
	    'button',
	    {
	      className: classes,
	      onClick: handleClick,
	      disabled: !selectedAnswer.id
	    },
	    'Vote'
	  );
	}
	
	VoteButton.propTypes = {
	  makeVoteRequest: _react.PropTypes.func,
	  selectedAnswer: _react.PropTypes.object
	};

/***/ },

/***/ 232:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _store = __webpack_require__(233);
	
	var PollField = new _store.Field({
	  initialState: {
	    data: {
	      answers: []
	    },
	    requestInFlight: false
	  },
	  fetchPollData: new _store.Action(function (state, src, store) {
	    src || (src = store.src);
	    store.src = src;
	    var request = this.request(src, {
	      success: store.actions.fetchPollDataSuccess,
	      failure: store.actions.fetchPollDataFailure,
	      error: store.actions.fetchPollDataError
	    });
	    state.requestInFlight = true;
	    return state;
	  }),
	  fetchPollDataSuccess: new _store.Action(function (state, data) {
	    state.data = data;
	    state.requestInFlight = false;
	    return state;
	  }),
	  fetchPollDataFailure: new _store.Action(function (state, failure) {
	    state.requestFailure = failure;
	    state.requestInFlight = false;
	    return state;
	  }),
	  fetchPollDataError: new _store.Action(function (state, error) {
	    state.requestError = error;
	    state.requestInFlight = false;
	    return state;
	  }),
	  resetFetchPollData: new _store.Action(function (state, _null, store) {
	    state.requestInFlight = false;
	    state.requestFailure = undefined;
	    state.requestError = undefined;
	    setImmediate(store.actions.fetchPollData);
	    return state;
	  })
	});
	
	exports.default = PollField;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44).setImmediate))

/***/ },

/***/ 234:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _store = __webpack_require__(233);
	
	var _poll = __webpack_require__(232);
	
	var _poll2 = _interopRequireDefault(_poll);
	
	var _selectedAnswer = __webpack_require__(235);
	
	var _selectedAnswer2 = _interopRequireDefault(_selectedAnswer);
	
	var _vote = __webpack_require__(236);
	
	var _vote2 = _interopRequireDefault(_vote);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PollStore = function (_Store) {
	  _inherits(PollStore, _Store);
	
	  function PollStore() {
	    _classCallCheck(this, PollStore);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(PollStore).apply(this, arguments));
	  }
	
	  return PollStore;
	}(_store.Store);
	
	exports.default = PollStore;
	
	_store.Store.defineFields(PollStore, {
	  poll: _poll2.default,
	  selectedAnswer: _selectedAnswer2.default,
	  vote: _vote2.default
	});

/***/ },

/***/ 235:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _store = __webpack_require__(233);
	
	var SelectedAnswerField = new _store.Field({
	  initialState: {},
	  selectAnswer: new _store.Action(function (state, answer) {
	    return state && state.id === answer.id ? {} : answer;
	  })
	});
	
	exports.default = SelectedAnswerField;

/***/ },

/***/ 236:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _store = __webpack_require__(233);
	
	var VoteField = new _store.Field({
	  initialState: {},
	  getCachedVoteData: new _store.Action(function (state, poll) {
	    state.data = localStorage.getItem('bulbs-poll:vote:' + poll.data.id);
	    return state;
	  }),
	  makeVoteRequest: new _store.Action(function (state, answer, store) {
	    var poll = store.state.poll;
	
	    var request = this.request('http://onion.sodahead.com/api/polls/' + poll.data.id, {
	      method: 'post',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify({
	        /* convert answer into vote data */
	      }),
	      success: store.actions.voteRequestSuccess,
	      failure: store.actions.voteRequestFailure,
	      error: store.actions.voteRequestError
	    });
	
	    state.requestInFlight = true;
	    return state;
	  }),
	  voteRequestSuccess: new _store.Action(function (state, data) {
	    state.data = data.vote;
	    state.requestInFlight = false;
	    return state;
	  }),
	  voteRequestFailure: new _store.Action(function (state, failure) {
	    state.requestFailure = failure;
	    state.requestInFlight = false;
	    return state;
	  }),
	  voteRequestError: new _store.Action(function (state, error) {
	    state.requestInFlight = false;
	    state.requestError = error;
	    return state;
	  }),
	  resetVoteRequest: new _store.Action(function (state) {
	    state.requestInFlight = false;
	    state.requestFailure = undefined;
	    state.requestError = undefined;
	    return state;
	  })
	});
	
	exports.default = VoteField;

/***/ },

/***/ 300:
/***/ function(module, exports) {

	"use strict";

/***/ },

/***/ 301:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(302);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(304)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./styles.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js!./styles.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 302:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(303)();
	// imports
	
	
	// module
	exports.push([module.id, "bulbs-poll {\n  display: block;\n  font-family: sans-serif;\n  border-top: 2px solid green;\n  background: #fafafa;\n  padding: 1em; }\n  bulbs-poll > div {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n  bulbs-poll .bulbs-poll-cover {\n    margin: 1em; }\n  bulbs-poll .bulbs-poll-answers {\n    margin: 0;\n    padding: 0; }\n  bulbs-poll .bulbs-poll-answer {\n    background: lightgray;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    list-style: none;\n    margin: 1em;\n    padding: 1em; }\n    bulbs-poll .bulbs-poll-answer svg {\n      margin-right: 1em; }\n  bulbs-poll .bulbs-poll-vote {\n    -webkit-align-self: center;\n        -ms-flex-item-align: center;\n            align-self: center;\n    background-color: lightgray;\n    border-radius: 8px;\n    border: none;\n    cursor: pointer;\n    padding: .5em 1.5em;\n    font-size: 1.5em; }\n    bulbs-poll .bulbs-poll-vote[disabled] {\n      cursor: not-allowed; }\n", ""]);
	
	// exports


/***/ },

/***/ 303:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },

/***/ 304:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }

});
//# sourceMappingURL=bulbs-poll.js.map