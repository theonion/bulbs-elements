webpackJsonp([10],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(50);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _register = __webpack_require__(236);
	
	var _register2 = _interopRequireDefault(_register);
	
	var _bulbsElement = __webpack_require__(248);
	
	var _bulbsElement2 = _interopRequireDefault(_bulbsElement);
	
	var _store = __webpack_require__(233);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _question = __webpack_require__(249);
	
	var _question2 = _interopRequireDefault(_question);
	
	var _results = __webpack_require__(250);
	
	var _results2 = _interopRequireDefault(_results);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BulbsPoll = function (_BulbsElement) {
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
	      return _react2.default.createElement(_question2.default, {
	        actions: this.store.actions,
	        data: this.state
	      });
	    }
	  }]);
	
	  return BulbsPoll;
	}(_bulbsElement2.default);
	
	BulbsPoll.store = _store2.default;
	
	BulbsPoll.propTypes = {
	  src: _react.PropTypes.string.isRequired
	};
	
	(0, _register2.default)('bulbs-poll', BulbsPoll);

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
	
	  var className = (0, _classnames2.default)('bulbs-poll-answer', {
	    selected: answer === selectedAnswer
	  });
	
	  return _react2.default.createElement(
	    'li',
	    {
	      className: className,
	      onClick: selectAnswer.bind(null, answer)
	    },
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
	      { className: 'bulbs-poll-title' },
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

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = VoteButton;
	
	var _react = __webpack_require__(50);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function VoteButton(props) {
	  function handleClick() {
	    if (props.selectedAnswer) {
	      props.makeVoteRequest(props.selectedAnswer);
	    }
	  }
	
	  return _react2.default.createElement(
	    "button",
	    {
	      className: "bulbs-poll-vote",
	      onClick: handleClick
	    },
	    "Vote"
	  );
	}
	
	VoteButton.propTypes = {
	  makeVoteRequest: _react.PropTypes.func,
	  selectedAnswer: _react.PropTypes.object
	};

/***/ },

/***/ 231:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _store = __webpack_require__(232);
	
	var PollField = new _store.Field({
	  initialState: {
	    data: {
	      answers: []
	    },
	    requestInFlight: false
	  },
	  fetchPollData: new _store.Action(function (state, src, store) {
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
	  })
	});
	
	exports.default = PollField;

/***/ },

/***/ 233:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _store = __webpack_require__(232);
	
	var _poll = __webpack_require__(231);
	
	var _poll2 = _interopRequireDefault(_poll);
	
	var _selectedAnswer = __webpack_require__(234);
	
	var _selectedAnswer2 = _interopRequireDefault(_selectedAnswer);
	
	var _vote = __webpack_require__(235);
	
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

/***/ 234:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _store = __webpack_require__(232);
	
	var SelectedAnswerField = new _store.Field({
	  initialState: null,
	  selectAnswer: new _store.Action(function (state, answer) {
	    return state && state.id === answer.id ? null : answer;
	  })
	});
	
	exports.default = SelectedAnswerField;

/***/ },

/***/ 235:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _store = __webpack_require__(232);
	
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
	  })
	});
	
	exports.default = VoteField;

/***/ },

/***/ 249:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Question;
	
	var _react = __webpack_require__(50);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _cover = __webpack_require__(228);
	
	var _cover2 = _interopRequireDefault(_cover);
	
	var _answers = __webpack_require__(227);
	
	var _answers2 = _interopRequireDefault(_answers);
	
	var _voteButton = __webpack_require__(230);
	
	var _voteButton2 = _interopRequireDefault(_voteButton);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Question(props) {
	  var _props$actions = props.actions;
	  var selectAnswer = _props$actions.selectAnswer;
	  var makeVoteRequest = _props$actions.makeVoteRequest;
	  var _props$data = props.data;
	  var poll = _props$data.poll;
	  var selectedAnswer = _props$data.selectedAnswer;
	  var vote = _props$data.vote;
	
	  return _react2.default.createElement(
	    'div',
	    { className: 'bulbs-poll' },
	    _react2.default.createElement(_cover2.default, { poll: poll }),
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

/***/ 250:
/***/ function(module, exports) {

	"use strict";

/***/ }

});
//# sourceMappingURL=bulbs-poll.js.map