webpackJsonp([33],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.displayPropType = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(183);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _invariant = __webpack_require__(36);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _bulbsElement = __webpack_require__(263);
	
	var _bulbsElement2 = _interopRequireDefault(_bulbsElement);
	
	var _register = __webpack_require__(1);
	
	__webpack_require__(358);
	
	var _campaignField = __webpack_require__(360);
	
	var _campaignField2 = _interopRequireDefault(_campaignField);
	
	var _campaignRequestField = __webpack_require__(361);
	
	var _campaignRequestField2 = _interopRequireDefault(_campaignRequestField);
	
	var _campaignDisplayRoot = __webpack_require__(362);
	
	var _campaignDisplayRoot2 = _interopRequireDefault(_campaignDisplayRoot);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var CampaignDisplay = function (_BulbsElement) {
	  _inherits(CampaignDisplay, _BulbsElement);
	
	  function CampaignDisplay(props) {
	    _classCallCheck(this, CampaignDisplay);
	
	    (0, _invariant2.default)(!!props.placement, 'campaign-display component requires a placement');
	    return _possibleConstructorReturn(this, _BulbsElement.call(this, props));
	  }
	
	  CampaignDisplay.prototype.initialDispatch = function initialDispatch() {
	    if (this.props.src) {
	      this.store.actions.fetchCampaign(this.props.src);
	    }
	  };
	
	  CampaignDisplay.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
	    if (this.props.src !== prevProps.src) {
	      this.store.actions.handleFetchComplete(null);
	      this.initialDispatch();
	    }
	  };
	
	  CampaignDisplay.prototype.render = function render() {
	    if (this.state.campaignRequest.networkError) {
	      return _react2.default.createElement('span', null);
	    }
	
	    var options = _extends({}, this.state, this.props, {
	      nameOnly: typeof this.props.nameOnly === 'string',
	      logoOnly: typeof this.props.logoOnly === 'string',
	      noPixel: typeof this.props.noPixel === 'string',
	      noLink: typeof this.props.noLink === 'string'
	    });
	
	    return _react2.default.createElement(_campaignDisplayRoot2.default, options);
	  };
	
	  return CampaignDisplay;
	}(_bulbsElement2.default);
	
	_extends(CampaignDisplay, {
	  displayName: 'CampaignDisplay',
	  schema: {
	    campaign: _campaignField2.default,
	    campaignRequest: _campaignRequestField2.default
	  },
	  propTypes: {
	    logoOnly: _react.PropTypes.string,
	    nameOnly: _react.PropTypes.string,
	    noLink: _react.PropTypes.string,
	    noPixel: _react.PropTypes.string,
	    placement: _react.PropTypes.string.isRequired,
	    preambleText: _react.PropTypes.string.isRequired,
	    src: _react.PropTypes.string.isRequired
	  }
	});
	
	(0, _register.registerReactElement)('campaign-display', CampaignDisplay);
	
	exports.default = CampaignDisplay;
	var displayPropType = exports.displayPropType = CampaignDisplay.propTypes.display;

/***/ },

/***/ 358:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 360:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var CampaignField = {
	  actions: {
	    handleFetchComplete: function handleFetchComplete(state, response) {
	      return response;
	    }
	  }
	};
	
	exports.default = CampaignField;

/***/ },

/***/ 361:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _util = __webpack_require__(185);
	
	var CampaignRequestField = {
	  initialState: {
	    requestInFlight: false
	  },
	
	  actions: {
	    fetchCampaign: function fetchCampaign(state, campaignUrl, store) {
	      state.requestInFlight = true;
	      (0, _util.makeRequest)(campaignUrl, {
	        credentials: 'include',
	        success: function success(response) {
	          store.actions.fetchCampaignSuccess(response);
	          store.actions.handleFetchComplete(response);
	        },
	        failure: store.actions.fetchCampaignFailure,
	        error: store.actions.fetchCampaignError
	      });
	      return state;
	    },
	    fetchCampaignSuccess: function fetchCampaignSuccess(state) {
	      state.requestInFlight = false;
	    },
	    fetchCampaignFailure: function fetchCampaignFailure(state, response) {
	      state.requestInFlight = false;
	      state.requestFailure = response;
	      return state;
	    },
	    fetchCampaignError: function fetchCampaignError(state, response) {
	      state.requestInFlight = false;
	      state.networkError = response;
	      return state;
	    }
	  }
	};
	
	exports.default = CampaignRequestField;

/***/ },

/***/ 362:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(183);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactAddonsCreateFragment = __webpack_require__(363);
	
	var _reactAddonsCreateFragment2 = _interopRequireDefault(_reactAddonsCreateFragment);
	
	var _logo = __webpack_require__(364);
	
	var _logo2 = _interopRequireDefault(_logo);
	
	var _preamble = __webpack_require__(365);
	
	var _preamble2 = _interopRequireDefault(_preamble);
	
	var _sponsorName = __webpack_require__(366);
	
	var _sponsorName2 = _interopRequireDefault(_sponsorName);
	
	var _dfpPixel = __webpack_require__(367);
	
	var _dfpPixel2 = _interopRequireDefault(_dfpPixel);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var CampaignDisplayRoot = function (_Component) {
	  _inherits(CampaignDisplayRoot, _Component);
	
	  function CampaignDisplayRoot(props) {
	    _classCallCheck(this, CampaignDisplayRoot);
	
	    return _possibleConstructorReturn(this, _Component.call(this, props));
	  }
	
	  CampaignDisplayRoot.prototype.hasImageUrl = function hasImageUrl() {
	    return !!this.props.campaign.image_url;
	  };
	
	  CampaignDisplayRoot.prototype.hasValidCampaign = function hasValidCampaign() {
	    return !!this.props.campaign;
	  };
	
	  CampaignDisplayRoot.prototype.pixelComponent = function pixelComponent() {
	    if (this.props.noPixel || !this.props.campaign.active) {
	      return '';
	    }
	
	    return _react2.default.createElement(_dfpPixel2.default, { campaignId: this.props.campaign.id, placement: this.props.placement });
	  };
	
	  CampaignDisplayRoot.prototype.logoComponent = function logoComponent() {
	    if (this.props.logoOnly && !this.hasImageUrl()) {
	      return this.sponsorNameComponent();
	    }
	    return _react2.default.createElement(_logo2.default, this.props.campaign);
	  };
	
	  CampaignDisplayRoot.prototype.sponsorNameComponent = function sponsorNameComponent() {
	    return _react2.default.createElement(_sponsorName2.default, this.props.campaign);
	  };
	
	  CampaignDisplayRoot.prototype.preambleTextComponent = function preambleTextComponent() {
	    return _react2.default.createElement(_preamble2.default, { text: this.props.preambleText });
	  };
	
	  CampaignDisplayRoot.prototype.defaultComponents = function defaultComponents() {
	    return (0, _reactAddonsCreateFragment2.default)({
	      dfpPixel: this.pixelComponent(),
	      logo: this.logoComponent(),
	      preamble: this.preambleTextComponent(),
	      sponsorName: this.sponsorNameComponent()
	    });
	  };
	
	  CampaignDisplayRoot.prototype.logoOnlyComponents = function logoOnlyComponents() {
	    return (0, _reactAddonsCreateFragment2.default)({
	      dfpPixel: this.pixelComponent(),
	      preamble: this.preambleTextComponent(),
	      logo: this.logoComponent()
	    });
	  };
	
	  CampaignDisplayRoot.prototype.nameOnlyComponents = function nameOnlyComponents() {
	    return (0, _reactAddonsCreateFragment2.default)({
	      dfpPixel: this.pixelComponent(),
	      preamble: this.preambleTextComponent(),
	      sponsorName: this.sponsorNameComponent()
	    });
	  };
	
	  CampaignDisplayRoot.prototype.childComponents = function childComponents() {
	    var children = void 0;
	    if (this.props.logoOnly) {
	      children = this.logoOnlyComponents();
	    } else if (this.props.nameOnly) {
	      children = this.nameOnlyComponents();
	    } else {
	      children = this.defaultComponents();
	    }
	
	    if (this.props.noLink) {
	      return children;
	    }
	
	    return _react2.default.createElement(
	      'a',
	      { href: this.props.campaign.clickthrough_url },
	      children
	    );
	  };
	
	  CampaignDisplayRoot.prototype.render = function render() {
	    if (!this.hasValidCampaign()) {
	      return _react2.default.createElement('div', { className: 'inactive-campaign' });
	    }
	    return _react2.default.createElement(
	      'div',
	      { className: 'campaign-display', 'data-track-label': this.props.campaign.clickthrough_url },
	      _react2.default.createElement(
	        'div',
	        { className: 'campaign-display-inner' },
	        this.childComponents()
	      )
	    );
	  };
	
	  return CampaignDisplayRoot;
	}(_react.Component);
	
	CampaignDisplayRoot.defaultProps = {
	  logoOnly: false,
	  nameOnly: false,
	  noLink: false,
	  noPixel: false
	};
	
	CampaignDisplayRoot.propTypes = {
	  campaign: _react.PropTypes.shape({
	    active: _react.PropTypes.bool.isRequired,
	    clickthrough_url: _react.PropTypes.string.isRequired,
	    id: _react.PropTypes.number.isRequired,
	    image_url: _react.PropTypes.string,
	    name: _react.PropTypes.string.isRequired
	  }),
	  logoOnly: _react.PropTypes.bool,
	  nameOnly: _react.PropTypes.bool,
	  noLink: _react.PropTypes.bool,
	  noPixel: _react.PropTypes.bool,
	  placement: _react.PropTypes.string.isRequired,
	  preambleText: _react.PropTypes.string.isRequired
	};
	
	exports.default = CampaignDisplayRoot;

/***/ },

/***/ 363:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule createReactFragment
	 */
	
	'use strict';
	
	var React = __webpack_require__(183);
	
	var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	  Symbol.for &&
	  Symbol.for('react.element')) ||
	  0xeac7;
	
	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}
	var emptyFunction = function emptyFunction() {};
	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};
	
	var validateFormat = function validateFormat(format) {};
	
	if (false) {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}
	
	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}
	
	var warning = emptyFunction;
	
	if (false) {
	  (function () {
	    var printWarning = function printWarning(format) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }
	
	      var argIndex = 0;
	      var message = 'Warning: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // --- Welcome to debugging React ---
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch (x) {}
	    };
	
	    warning = function warning(condition, format) {
	      if (format === undefined) {
	        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	      }
	
	      if (format.indexOf('Failed Composite propType: ') === 0) {
	        return; // Ignore CompositeComponent proptype check.
	      }
	
	      if (!condition) {
	        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	          args[_key2 - 2] = arguments[_key2];
	        }
	
	        printWarning.apply(undefined, [format].concat(args));
	      }
	    };
	  })();
	}
	
	var SEPARATOR = '.';
	var SUBSEPARATOR = ':';
	
	var didWarnAboutMaps = false;
	
	var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.
	
	function getIteratorFn(maybeIterable) {
	  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	  if (typeof iteratorFn === 'function') {
	    return iteratorFn;
	  }
	}
	
	function escape(key) {
	  var escapeRegex = /[=:]/g;
	  var escaperLookup = {
	    '=': '=0',
	    ':': '=2',
	  };
	  var escapedString = ('' + key).replace(escapeRegex, function(match) {
	    return escaperLookup[match];
	  });
	
	  return '$' + escapedString;
	}
	
	function getComponentKey(component, index) {
	  // Do some typechecking here since we call this blindly. We want to ensure
	  // that we don't block potential future ES APIs.
	  if (component && typeof component === 'object' && component.key != null) {
	    // Explicit key
	    return escape(component.key);
	  }
	  // Implicit key determined by the index in the set
	  return index.toString(36);
	}
	
	function traverseAllChildrenImpl(
	  children,
	  nameSoFar,
	  callback,
	  traverseContext
	) {
	  var type = typeof children;
	
	  if (type === 'undefined' || type === 'boolean') {
	    // All of the above are perceived as null.
	    children = null;
	  }
	
	  if (
	    children === null ||
	    type === 'string' ||
	    type === 'number' ||
	    // The following is inlined from ReactElement. This means we can optimize
	    // some checks. React Fiber also inlines this logic for similar purposes.
	    (type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE)
	  ) {
	    callback(
	      traverseContext,
	      children,
	      // If it's the only child, treat the name as if it was wrapped in an array
	      // so that it's consistent if the number of children grows.
	      nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar
	    );
	    return 1;
	  }
	
	  var child;
	  var nextName;
	  var subtreeCount = 0; // Count of children found in the current subtree.
	  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;
	
	  if (Array.isArray(children)) {
	    for (var i = 0; i < children.length; i++) {
	      child = children[i];
	      nextName = nextNamePrefix + getComponentKey(child, i);
	      subtreeCount += traverseAllChildrenImpl(
	        child,
	        nextName,
	        callback,
	        traverseContext
	      );
	    }
	  } else {
	    var iteratorFn = getIteratorFn(children);
	    if (iteratorFn) {
	      if (false) {
	        // Warn about using Maps as children
	        if (iteratorFn === children.entries) {
	          warning(
	            didWarnAboutMaps,
	            'Using Maps as children is unsupported and will likely yield ' +
	              'unexpected results. Convert it to a sequence/iterable of keyed ' +
	              'ReactElements instead.'
	          );
	          didWarnAboutMaps = true;
	        }
	      }
	
	      var iterator = iteratorFn.call(children);
	      var step;
	      var ii = 0;
	      while (!(step = iterator.next()).done) {
	        child = step.value;
	        nextName = nextNamePrefix + getComponentKey(child, ii++);
	        subtreeCount += traverseAllChildrenImpl(
	          child,
	          nextName,
	          callback,
	          traverseContext
	        );
	      }
	    } else if (type === 'object') {
	      var addendum = '';
	      if (false) {
	        addendum = ' If you meant to render a collection of children, use an array ' +
	          'instead or wrap the object using createFragment(object) from the ' +
	          'React add-ons.';
	      }
	      var childrenString = '' + children;
	      invariant(
	        false,
	        'Objects are not valid as a React child (found: %s).%s',
	        childrenString === '[object Object]'
	          ? 'object with keys {' + Object.keys(children).join(', ') + '}'
	          : childrenString,
	        addendum
	      );
	    }
	  }
	
	  return subtreeCount;
	}
	
	function traverseAllChildren(children, callback, traverseContext) {
	  if (children == null) {
	    return 0;
	  }
	
	  return traverseAllChildrenImpl(children, '', callback, traverseContext);
	}
	
	var userProvidedKeyEscapeRegex = /\/+/g;
	function escapeUserProvidedKey(text) {
	  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
	}
	
	function cloneAndReplaceKey(oldElement, newKey) {
	  return React.cloneElement(
	    oldElement,
	    { key: newKey },
	    oldElement.props !== undefined
	      ? oldElement.props.children
	      : undefined
	  );
	};
	
	var DEFAULT_POOL_SIZE = 10;
	var DEFAULT_POOLER = oneArgumentPooler;
	
	var oneArgumentPooler = function(copyFieldsFrom) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, copyFieldsFrom);
	    return instance;
	  } else {
	    return new Klass(copyFieldsFrom);
	  }
	};
	
	var addPoolingTo = function(
	  CopyConstructor,
	  pooler
	) {
	  // Casting as any so that flow ignores the actual implementation and trusts
	  // it to match the type we declared
	  var NewKlass = CopyConstructor;
	  NewKlass.instancePool = [];
	  NewKlass.getPooled = pooler || DEFAULT_POOLER;
	  if (!NewKlass.poolSize) {
	    NewKlass.poolSize = DEFAULT_POOL_SIZE;
	  }
	  NewKlass.release = standardReleaser;
	  return NewKlass;
	};
	
	var standardReleaser = function(instance) {
	  var Klass = this;
	  invariant(
	    instance instanceof Klass,
	    'Trying to release an instance into a pool of a different type.'
	  );
	  instance.destructor();
	  if (Klass.instancePool.length < Klass.poolSize) {
	    Klass.instancePool.push(instance);
	  }
	};
	
	var fourArgumentPooler = function(a1, a2, a3, a4) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3, a4);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3, a4);
	  }
	};
	
	function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
	  this.result = mapResult;
	  this.keyPrefix = keyPrefix;
	  this.func = mapFunction;
	  this.context = mapContext;
	  this.count = 0;
	}
	MapBookKeeping.prototype.destructor = function() {
	  this.result = null;
	  this.keyPrefix = null;
	  this.func = null;
	  this.context = null;
	  this.count = 0;
	};
	addPoolingTo(MapBookKeeping, fourArgumentPooler);
	
	function mapSingleChildIntoContext(bookKeeping, child, childKey) {
	  var {result, keyPrefix, func, context} = bookKeeping;
	
	  var mappedChild = func.call(context, child, bookKeeping.count++);
	  if (Array.isArray(mappedChild)) {
	    mapIntoWithKeyPrefixInternal(
	      mappedChild,
	      result,
	      childKey,
	      emptyFunction.thatReturnsArgument
	    );
	  } else if (mappedChild != null) {
	    if (React.isValidElement(mappedChild)) {
	      mappedChild = cloneAndReplaceKey(
	        mappedChild,
	        // Keep both the (mapped) and old keys if they differ, just as
	        // traverseAllChildren used to do for objects as children
	        keyPrefix +
	          (mappedChild.key && (!child || child.key !== mappedChild.key)
	            ? escapeUserProvidedKey(mappedChild.key) + '/'
	            : '') +
	          childKey
	      );
	    }
	    result.push(mappedChild);
	  }
	}
	
	function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
	  var escapedPrefix = '';
	  if (prefix != null) {
	    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
	  }
	  var traverseContext = MapBookKeeping.getPooled(
	    array,
	    escapedPrefix,
	    func,
	    context
	  );
	  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
	  MapBookKeeping.release(traverseContext);
	}
	
	var numericPropertyRegex = /^\d+$/;
	
	var warnedAboutNumeric = false;
	
	function createReactFragment(object) {
	  if (typeof object !== 'object' || !object || Array.isArray(object)) {
	    warning(
	      false,
	      'React.addons.createFragment only accepts a single object. Got: %s',
	      object
	    );
	    return object;
	  }
	  if (React.isValidElement(object)) {
	    warning(
	      false,
	      'React.addons.createFragment does not accept a ReactElement ' +
	        'without a wrapper object.'
	    );
	    return object;
	  }
	
	  invariant(
	    object.nodeType !== 1,
	    'React.addons.createFragment(...): Encountered an invalid child; DOM ' +
	      'elements are not valid children of React components.'
	  );
	
	  var result = [];
	
	  for (var key in object) {
	    if (false) {
	      if (!warnedAboutNumeric && numericPropertyRegex.test(key)) {
	        warning(
	          false,
	          'React.addons.createFragment(...): Child objects should have ' +
	            'non-numeric keys so ordering is preserved.'
	        );
	        warnedAboutNumeric = true;
	      }
	    }
	    mapIntoWithKeyPrefixInternal(
	      object[key],
	      result,
	      key,
	      emptyFunction.thatReturnsArgument
	    );
	  }
	
	  return result;
	}
	
	module.exports = createReactFragment;


/***/ },

/***/ 364:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(183);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var Logo = function (_Component) {
	  _inherits(Logo, _Component);
	
	  function Logo() {
	    _classCallCheck(this, Logo);
	
	    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	  }
	
	  Logo.prototype.render = function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'campaign-display-logo' },
	      _react2.default.createElement('img', { src: this.props.image_url })
	    );
	  };
	
	  return Logo;
	}(_react.Component);
	
	exports.default = Logo;
	
	
	Logo.propTypes = {
	  image_url: _react.PropTypes.string.isRequired,
	  noLink: _react.PropTypes.bool
	};

/***/ },

/***/ 365:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Preamble;
	
	var _react = __webpack_require__(183);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Preamble(props) {
	  return _react2.default.createElement(
	    'span',
	    { className: 'campaign-display-preamble' },
	    props.text
	  );
	}
	
	Preamble.propTypes = {
	  text: _react.PropTypes.string.isRequired
	};

/***/ },

/***/ 366:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(183);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var SponsorName = function (_Component) {
	  _inherits(SponsorName, _Component);
	
	  function SponsorName() {
	    _classCallCheck(this, SponsorName);
	
	    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	  }
	
	  SponsorName.prototype.render = function render() {
	    return _react2.default.createElement(
	      'span',
	      { className: 'campaign-display-sponsor-name' },
	      this.props.name
	    );
	  };
	
	  return SponsorName;
	}(_react.Component);
	
	exports.default = SponsorName;
	
	
	SponsorName.propTypes = {
	  name: _react.PropTypes.string.isRequired,
	  noLink: _react.PropTypes.bool
	};

/***/ },

/***/ 367:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(183);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var DfpPixel = function (_Component) {
	  _inherits(DfpPixel, _Component);
	
	  function DfpPixel() {
	    _classCallCheck(this, DfpPixel);
	
	    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	  }
	
	  DfpPixel.prototype.componentDidMount = function componentDidMount() {
	    var adsManager = window.BULBS_ELEMENTS_ADS_MANAGER;
	    if (typeof adsManager !== 'undefined' && typeof adsManager.loadAds === 'function') {
	      adsManager.loadAds(this.refs.container);
	    } else {
	      console.warn('<campaign-display> pixel will not trigger since ' + '`window.BULBS_ELEMENTS_ADS_MANAGER` is not configured to an ' + 'AdsManager instance.');
	    }
	  };
	
	  DfpPixel.prototype.render = function render() {
	    var targeting = {
	      dfp_placement: this.props.placement,
	      dfp_campaign_id: this.props.campaignId
	    };
	
	    return _react2.default.createElement('div', {
	      ref: 'container',
	      className: 'dfp',
	      'data-ad-unit': 'campaign-pixel',
	      'data-targeting': JSON.stringify(targeting) });
	  };
	
	  return DfpPixel;
	}(_react.Component);
	
	exports.default = DfpPixel;
	
	
	DfpPixel.displayName = 'DfpPixel';
	
	DfpPixel.propTypes = {
	  campaignId: _react.PropTypes.number.isRequired,
	  placement: _react.PropTypes.string.isRequired
	};

/***/ }

});
//# sourceMappingURL=campaign-display.js.map