webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _core = __webpack_require__(158);

	var _store = __webpack_require__(166);

	var _store2 = _interopRequireDefault(_store);

	var _classnames = __webpack_require__(168);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function CroppedImage() {
	  return _react2.default.createElement('img', null);
	}
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
	  selectAnswer: _react.PropTypes.func.isRequired
	};

	function PollCover(props) {
	  var poll = props.poll;

	  return _react2.default.createElement(
	    'header',
	    { className: 'bulbs-poll-cover' },
	    poll.thumbnail ? _react2.default.createElement(CroppedImage, { image: poll.thumbnail }) : undefined,
	    _react2.default.createElement(
	      'h1',
	      { className: 'bulbs-poll-title' },
	      poll.question_text
	    )
	  );
	}

	PollCover.propTypes = {
	  poll: _react.PropTypes.object.isRequired
	};

	function VoteButton(props) {
	  function handleClick() {
	    if (props.selectedAnswer) {
	      props.voteRequest(props.selectedAnswer);
	    }
	  }

	  return _react2.default.createElement(
	    'button',
	    {
	      className: 'bulbs-poll-vote',
	      onClick: handleClick
	    },
	    'Vote'
	  );
	}

	VoteButton.propTypes = {
	  selectedAnswer: _react.PropTypes.object,
	  voteRequest: _react.PropTypes.func
	};

	function PollAnswers(props) {
	  return _react2.default.createElement(
	    'ul',
	    { className: 'bulbs-poll-answers' },
	    props.answers.map(function (answer, index) {
	      return _react2.default.createElement(Answer, _extends({
	        key: index,
	        answer: answer
	      }, props));
	    })
	  );
	}

	PollAnswers.propTypes = {
	  answers: _react.PropTypes.array.isRequired,
	  selectedAnswer: _react.PropTypes.object,
	  selectAnswer: _react.PropTypes.func.isRequired
	};

	var BulbsPoll = function (_BulbsElement) {
	  _inherits(BulbsPoll, _BulbsElement);

	  function BulbsPoll() {
	    _classCallCheck(this, BulbsPoll);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(BulbsPoll).apply(this, arguments));
	  }

	  _createClass(BulbsPoll, [{
	    key: 'initialDispatch',
	    value: function initialDispatch() {
	      this.store.actions.setPollData(this.props.pollData);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _store$actions = this.store.actions;
	      var selectAnswer = _store$actions.selectAnswer;
	      var voteRequest = _store$actions.voteRequest;
	      var _state = this.state;
	      var poll = _state.poll;
	      var selectedAnswer = _state.selectedAnswer;

	      return _react2.default.createElement(
	        'div',
	        { className: 'bulbs-poll' },
	        _react2.default.createElement(PollCover, { poll: poll }),
	        _react2.default.createElement(PollAnswers, {
	          answers: poll.answers,
	          selectAnswer: selectAnswer,
	          selectedAnswer: selectedAnswer
	        }),
	        _react2.default.createElement(VoteButton, {
	          selectedAnswer: selectedAnswer,
	          voteRequest: voteRequest
	        })
	      );
	    }
	  }]);

	  return BulbsPoll;
	}(_core.BulbsElement);

	BulbsPoll.store = _store2.default;

	BulbsPoll.propTypes = {
	  pollData: _react.PropTypes.string.isRequired
	};

	BulbsPoll.displayName = 'BulbsPoll';

	(0, _core.register)('bulbs-poll', BulbsPoll);

/***/ },

/***/ 166:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _store = __webpack_require__(167);

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
	  poll: new _store.Field({
	    initialState: {
	      answers: []
	    },
	    setPollData: new _store.Action(function (state, payload) {
	      return JSON.parse(payload);
	    })
	  }),
	  selectedAnswer: new _store.Field({
	    initialState: null,
	    selectAnswer: new _store.Action(function (state, payload) {
	      return state === payload ? null : payload;
	    })
	  }),
	  vote: new _store.PromiseField({
	    generate: function generate(state, payload) {
	      return fetch('http://onion.sodahead/api/polls/:id', payload);
	    },
	    success: new _store.Action(function (state, payload) {
	      if (payload.status < 300) {
	        state.data = payload.json();
	      } else if (payload.status >= 400) {
	        state.failure = payload.json();
	      }
	      return state;
	    }),
	    error: new _store.Action(function (state, payload) {
	      state.error = error;
	      return state;
	    })
	  })
	});

/***/ },

/***/ 167:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Action = exports.PromiseField = exports.Field = exports.Store = undefined;

	var _objectMapToArray = __webpack_require__(165);

	var _objectMapToArray2 = _interopRequireDefault(_objectMapToArray);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DuplicateActionError = function (_Error) {
	  _inherits(DuplicateActionError, _Error);

	  function DuplicateActionError() {
	    _classCallCheck(this, DuplicateActionError);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(DuplicateActionError).apply(this, arguments));
	  }

	  return DuplicateActionError;
	}(Error);

	var Store = exports.Store = function () {
	  function Store(component) {
	    _classCallCheck(this, Store);

	    this.dispatch = this.dispatch.bind(this);
	    this.actions = this.collectActions();
	    this.state = this.collectInitialState();
	    this.component = component;
	    this.component.state = this.state;
	    console.log('%cCREATED STORE', 'color:green');
	  }

	  _createClass(Store, [{
	    key: 'dispatch',
	    value: function dispatch(action, payload) {
	      console.time('dispatch');
	      var nextState = this.state ? Object.assign(this.state) : this.state;
	      var actionState = this.getStateForAction(action, nextState);

	      var actionNextState = undefined;
	      if (action instanceof Function) {
	        actionNextState = action(actionState, payload, this.dispatch);
	      } else if (action instanceof Action) {
	        actionNextState = action.invoke(actionState, payload, this.dispatch);
	      }
	      this.setStateForAction(action, nextState, actionNextState);
	      this.state = nextState;
	      this.component.setState(this.state);
	      console.groupCollapsed('DISPATCH %c' + action.type + ' %c=> %c' + action.fieldKey, 'color:green', 'color:auto', 'color:blue');
	      console.timeEnd('dispatch');
	      console.log('PAYLOAD: ', payload);
	      console.log('PREV VALUE: ', actionState);
	      console.log('NEXT VALUE: ', actionNextState);
	      console.log('PREV STORE: ', this.state);
	      console.log('NEXT STORE: ', nextState);
	      console.groupEnd();
	    }
	  }, {
	    key: 'getStateForAction',
	    value: function getStateForAction(action, state) {
	      var field = state[action.fieldKey];
	      return field ? Object.assign(field) : field;
	    }
	  }, {
	    key: 'setStateForAction',
	    value: function setStateForAction(action, state, actionState) {
	      state[action.fieldKey] = actionState;
	    }
	  }, {
	    key: 'eachField',
	    value: function eachField(callback) {
	      (0, _objectMapToArray2.default)(this.constructor.fields, callback);
	    }
	  }, {
	    key: 'collectActions',
	    value: function collectActions() {
	      var _this2 = this;

	      var fields = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      var actions = {};
	      this.eachField(function (field) {
	        (0, _objectMapToArray2.default)(field.actions, function (action, key) {
	          if (actions.hasOwnProperty(key)) {
	            throw new DuplicateActionError(_this2, key);
	          }
	          actions[key] = function (payload) {
	            _this2.dispatch(action, payload);
	          };
	        });
	      });
	      return actions;
	    }
	  }, {
	    key: 'collectInitialState',
	    value: function collectInitialState() {
	      var initialState = {};
	      this.eachField(function (field, key) {
	        return initialState[key] = field.initialState;
	      });
	      return initialState;
	    }
	  }]);

	  return Store;
	}();

	Store.defineFields = function (StoreClass, fields) {
	  (0, _objectMapToArray2.default)(fields, function (field, fieldKey) {
	    field.key = fieldKey;
	    (0, _objectMapToArray2.default)(field.actions, function (action, actionKey) {
	      action.fieldKey = fieldKey;
	      action.type = actionKey;
	    });
	  });
	  StoreClass.fields = fields;
	};

	var Field = exports.Field = function () {
	  function Field(props) {
	    _classCallCheck(this, Field);

	    this._props = props;
	    this.initialState = this._props.initialState || null;
	  }

	  _createClass(Field, [{
	    key: 'props',
	    set: function set(props) {
	      return this._props = props;
	    },
	    get: function get() {
	      return this._props;
	    }
	  }, {
	    key: 'actions',
	    get: function get() {
	      var actions = {};
	      (0, _objectMapToArray2.default)(this.props, function (prop, key) {
	        if (key !== 'initialState') {
	          actions[key] = prop;
	        }
	      });
	      return actions;
	    }
	  }]);

	  return Field;
	}();

	var PromiseField = exports.PromiseField = function (_Field) {
	  _inherits(PromiseField, _Field);

	  function PromiseField(callbacks) {
	    _classCallCheck(this, PromiseField);

	    var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(PromiseField).call(this, {
	      initialState: {
	        active: false
	      }
	    }));

	    _this3.callbacks = callbacks;
	    return _this3;
	  }

	  _createClass(PromiseField, [{
	    key: 'generateActions',
	    value: function generateActions() {
	      var _actions;

	      var _callbacks = this.callbacks;
	      var generate = _callbacks.generate;
	      var success = _callbacks.success;
	      var error = _callbacks.error;

	      if (this._actions) {
	        return;
	      }

	      var actions = this._actions = (_actions = {}, _defineProperty(_actions, this.key + 'Request', new Action(function () {
	        var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        var _this4 = this;

	        var payload = arguments[1];
	        var dispatch = arguments[2];

	        var promise = generate(state, payload).then(function (response) {
	          return dispatch(actions[_this4.fieldKey + 'Success'], response);
	        }).catch(function (error) {
	          return dispatch(actions[_this4.fieldKey + 'Error'], error);
	        });
	        state.active = true;
	        state.promise = promise;
	        return state;
	      })), _defineProperty(_actions, this.key + 'Success', new Action(function (state, payload) {
	        state.active = false;
	        return success.invoke(state, payload);
	      })), _defineProperty(_actions, this.key + 'Error', new Action(function (state, payload) {
	        state.active = false;
	        state.error = error;
	        return error.invoke(state, payload);
	      })), _defineProperty(_actions, this.key + 'Reset', new Action(function (state, payload) {
	        return {
	          active: false
	        };
	      })), _actions);
	    }
	  }, {
	    key: 'actions',
	    get: function get() {
	      this.generateActions();
	      return this._actions;
	    }
	  }]);

	  return PromiseField;
	}(Field);

	var Action = exports.Action = function Action(handler) {
	  _classCallCheck(this, Action);

	  this.invoke = handler;
	};

/***/ }

});