webpackJsonp([0],{

/***/ 0:
/*!***************************************************!*\
  !*** ./elements/bulbs-carousel/bulbs-carousel.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _invariant = __webpack_require__(/*! invariant */ 1);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _register = __webpack_require__(/*! bulbs-elements/register */ 2);
	
	var _util = __webpack_require__(/*! bulbs-elements/util */ 183);
	
	var _bulbsCarouselState = __webpack_require__(/*! ./bulbs-carousel-state */ 190);
	
	var _bulbsCarouselState2 = _interopRequireDefault(_bulbsCarouselState);
	
	__webpack_require__(/*! ./bulbs-carousel.scss */ 191);
	
	__webpack_require__(/*! ./item */ 195);
	
	__webpack_require__(/*! ./buttons */ 196);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var BulbsCarousel = function (_BulbsHTMLElement) {
	  _inherits(BulbsCarousel, _BulbsHTMLElement);
	
	  function BulbsCarousel() {
	    _classCallCheck(this, BulbsCarousel);
	
	    return _possibleConstructorReturn(this, _BulbsHTMLElement.apply(this, arguments));
	  }
	
	  BulbsCarousel.prototype.createdCallback = function createdCallback() {
	    (0, _invariant2.default)(this.slider = this.querySelector('bulbs-carousel-slider'), '<bulbs-carousel> MUST contain a <bulbs-carousel-slider> element.');
	
	    this.handleClick = this.handleClick.bind(this);
	    this.addEventListener('click', this.handleClick);
	
	    this.track = document.createElement('bulbs-carousel-track');
	    (0, _util.moveChildren)(this.slider, this.track);
	    this.slider.appendChild(this.track);
	
	    this.previousButtons = this.getElementsByTagName('bulbs-carousel-previous');
	    this.nextButtons = this.getElementsByTagName('bulbs-carousel-next');
	
	    this.state = new _bulbsCarouselState2.default({
	      carousel: this,
	      carouselItems: this.track.children,
	      currentIndex: 0
	    });
	  };
	
	  BulbsCarousel.prototype.attachedCallback = function attachedCallback() {
	    this.state.pageToCarouselItem(this.state.getActiveCarouselItem());
	    this.applyState();
	  };
	
	  BulbsCarousel.prototype.handleClick = function handleClick(event) {
	    if (event.target.closest('bulbs-carousel-previous')) {
	      this.state.slideToPrevious();
	      this.applyState();
	    }
	
	    if (event.target.closest('bulbs-carousel-next')) {
	      this.state.slideToNext();
	      this.applyState();
	    }
	  };
	
	  BulbsCarousel.prototype.applyState = function applyState() {
	    var currentPage = this.state.getCurrentPage();
	    var onFirstPage = this.state.isOnfirstPage();
	    var onLastPage = this.state.isOnLastPage();
	    var translate = -100 * currentPage;
	    var itemMargin = this.state.getItemMargin();
	    var marginCorrection = itemMargin * currentPage;
	
	    // some IE browsers do not support css calc() in the transform property.
	    // For those browsers one uses multiple translateX() declarations.
	    //      Be sad.
	    if (_util.supportsCalcInTransform) {
	      this.track.style.transform = 'translateX(calc(' + translate + '% - ' + marginCorrection + 'px))';
	    } else {
	      this.track.style.transform = 'translateX(' + translate + '%) translateX(-' + marginCorrection + 'px)';
	    }
	
	    function toggleAttribute(collection, attribute, toggle) {
	      Array.prototype.forEach.call(collection, function (item) {
	        toggle ? item.setAttribute(attribute, '') : item.removeAttribute(attribute);
	      });
	    }
	
	    toggleAttribute(this.previousButtons, 'disabled', onFirstPage);
	    toggleAttribute(this.nextButtons, 'disabled', onLastPage);
	  };
	
	  return BulbsCarousel;
	}(_register.BulbsHTMLElement);
	
	exports.default = BulbsCarousel;
	
	
	(0, _register.registerElement)('bulbs-carousel', BulbsCarousel);
	(0, _register.registerElement)('bulbs-carousel-slider', function (_BulbsHTMLElement2) {
	  _inherits(BulbsCarouselSlider, _BulbsHTMLElement2);
	
	  function BulbsCarouselSlider() {
	    _classCallCheck(this, BulbsCarouselSlider);
	
	    return _possibleConstructorReturn(this, _BulbsHTMLElement2.apply(this, arguments));
	  }
	
	  return BulbsCarouselSlider;
	}(_register.BulbsHTMLElement));
	(0, _register.registerElement)('bulbs-carousel-track', function (_BulbsHTMLElement3) {
	  _inherits(BulbsCarouselTrack, _BulbsHTMLElement3);
	
	  function BulbsCarouselTrack() {
	    _classCallCheck(this, BulbsCarouselTrack);
	
	    return _possibleConstructorReturn(this, _BulbsHTMLElement3.apply(this, arguments));
	  }
	
	  return BulbsCarouselTrack;
	}(_register.BulbsHTMLElement));

/***/ },

/***/ 1:
/*!********************************!*\
  !*** ./~/invariant/browser.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (true) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};
	
	module.exports = invariant;


/***/ },

/***/ 183:
/*!******************************************!*\
  !*** ./lib/bulbs-elements/util/index.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _makeRequest = __webpack_require__(/*! ./make-request */ 184);
	
	var _makeRequest2 = _interopRequireDefault(_makeRequest);
	
	var _iterateObject = __webpack_require__(/*! ./iterate-object */ 186);
	
	var _iterateObject2 = _interopRequireDefault(_iterateObject);
	
	var _moveChildren = __webpack_require__(/*! ./move-children */ 187);
	
	var _moveChildren2 = _interopRequireDefault(_moveChildren);
	
	var _copyAttribute = __webpack_require__(/*! ./copy-attribute */ 188);
	
	var _copyAttribute2 = _interopRequireDefault(_copyAttribute);
	
	var _supportsCalcInTransform = __webpack_require__(/*! ./supports-calc-in-transform */ 189);
	
	var _supportsCalcInTransform2 = _interopRequireDefault(_supportsCalcInTransform);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = {
	  makeRequest: _makeRequest2.default,
	  iterateObject: _iterateObject2.default,
	  moveChildren: _moveChildren2.default,
	  copyAttribute: _copyAttribute2.default,
	  supportsCalcInTransform: _supportsCalcInTransform2.default
	};

/***/ },

/***/ 184:
/*!*************************************************!*\
  !*** ./lib/bulbs-elements/util/make-request.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = makeRequest;
	
	var _clone = __webpack_require__(/*! clone */ 185);
	
	var _clone2 = _interopRequireDefault(_clone);
	
	var _invariant = __webpack_require__(/*! invariant */ 1);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function makeRequest(url) {
	  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	  (0, _invariant2.default)(options.success, 'makeRequest MUST have a success callback');
	  (0, _invariant2.default)(options.failure, 'makeRequest MUST have a failure callback');
	  (0, _invariant2.default)(options.error, 'makeRequest MUST have an error callback');
	
	  var success = options.success;
	  var failure = options.failure;
	  var error = options.error;
	
	  var callbacks = { success: success, failure: failure, error: error };
	  var requestOptions = (0, _clone2.default)(options);
	
	  // defensively deleting these options
	  // so we don't pass them through to fetch
	  delete requestOptions.success;
	  delete requestOptions.failure;
	  delete requestOptions.error;
	
	  if (!options.redirect) {
	    requestOptions.redirect = 'follow';
	  }
	
	  return fetch(url, requestOptions).then(function (response) {
	    var promise = void 0;
	    if (response.status < 300) {
	      promise = response.json().then(callbacks.success);
	    } else if (response.status >= 400) {
	      promise = response.json().then(callbacks.failure);
	    }
	    return promise;
	  }).catch(callbacks.error);
	}

/***/ },

/***/ 185:
/*!**************************!*\
  !*** ./~/clone/clone.js ***!
  \**************************/
/***/ function(module, exports) {

	var clone = (function() {
	'use strict';
	
	/**
	 * Clones (copies) an Object using deep copying.
	 *
	 * This function supports circular references by default, but if you are certain
	 * there are no circular references in your object, you can save some CPU time
	 * by calling clone(obj, false).
	 *
	 * Caution: if `circular` is false and `parent` contains circular references,
	 * your program may enter an infinite loop and crash.
	 *
	 * @param `parent` - the object to be cloned
	 * @param `circular` - set to true if the object to be cloned may contain
	 *    circular references. (optional - true by default)
	 * @param `depth` - set to a number if the object is only to be cloned to
	 *    a particular depth. (optional - defaults to Infinity)
	 * @param `prototype` - sets the prototype to be used when cloning an object.
	 *    (optional - defaults to parent prototype).
	*/
	function clone(parent, circular, depth, prototype) {
	  var filter;
	  if (typeof circular === 'object') {
	    depth = circular.depth;
	    prototype = circular.prototype;
	    filter = circular.filter;
	    circular = circular.circular
	  }
	  // maintain two arrays for circular references, where corresponding parents
	  // and children have the same index
	  var allParents = [];
	  var allChildren = [];
	
	  var useBuffer = typeof Buffer != 'undefined';
	
	  if (typeof circular == 'undefined')
	    circular = true;
	
	  if (typeof depth == 'undefined')
	    depth = Infinity;
	
	  // recurse this function so we don't reset allParents and allChildren
	  function _clone(parent, depth) {
	    // cloning null always returns null
	    if (parent === null)
	      return null;
	
	    if (depth == 0)
	      return parent;
	
	    var child;
	    var proto;
	    if (typeof parent != 'object') {
	      return parent;
	    }
	
	    if (clone.__isArray(parent)) {
	      child = [];
	    } else if (clone.__isRegExp(parent)) {
	      child = new RegExp(parent.source, __getRegExpFlags(parent));
	      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
	    } else if (clone.__isDate(parent)) {
	      child = new Date(parent.getTime());
	    } else if (useBuffer && Buffer.isBuffer(parent)) {
	      child = new Buffer(parent.length);
	      parent.copy(child);
	      return child;
	    } else {
	      if (typeof prototype == 'undefined') {
	        proto = Object.getPrototypeOf(parent);
	        child = Object.create(proto);
	      }
	      else {
	        child = Object.create(prototype);
	        proto = prototype;
	      }
	    }
	
	    if (circular) {
	      var index = allParents.indexOf(parent);
	
	      if (index != -1) {
	        return allChildren[index];
	      }
	      allParents.push(parent);
	      allChildren.push(child);
	    }
	
	    for (var i in parent) {
	      var attrs;
	      if (proto) {
	        attrs = Object.getOwnPropertyDescriptor(proto, i);
	      }
	
	      if (attrs && attrs.set == null) {
	        continue;
	      }
	      child[i] = _clone(parent[i], depth - 1);
	    }
	
	    return child;
	  }
	
	  return _clone(parent, depth);
	}
	
	/**
	 * Simple flat clone using prototype, accepts only objects, usefull for property
	 * override on FLAT configuration object (no nested props).
	 *
	 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
	 * works.
	 */
	clone.clonePrototype = function clonePrototype(parent) {
	  if (parent === null)
	    return null;
	
	  var c = function () {};
	  c.prototype = parent;
	  return new c();
	};
	
	// private utility functions
	
	function __objToStr(o) {
	  return Object.prototype.toString.call(o);
	};
	clone.__objToStr = __objToStr;
	
	function __isDate(o) {
	  return typeof o === 'object' && __objToStr(o) === '[object Date]';
	};
	clone.__isDate = __isDate;
	
	function __isArray(o) {
	  return typeof o === 'object' && __objToStr(o) === '[object Array]';
	};
	clone.__isArray = __isArray;
	
	function __isRegExp(o) {
	  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
	};
	clone.__isRegExp = __isRegExp;
	
	function __getRegExpFlags(re) {
	  var flags = '';
	  if (re.global) flags += 'g';
	  if (re.ignoreCase) flags += 'i';
	  if (re.multiline) flags += 'm';
	  return flags;
	};
	clone.__getRegExpFlags = __getRegExpFlags;
	
	return clone;
	})();
	
	if (typeof module === 'object' && module.exports) {
	  module.exports = clone;
	}


/***/ },

/***/ 186:
/*!***************************************************!*\
  !*** ./lib/bulbs-elements/util/iterate-object.js ***!
  \***************************************************/
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function iterateObject() {
	  var object = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var fn = arguments[1];
	
	  Object.keys(object).forEach(function (key) {
	    fn(object[key], key);
	  });
	};

/***/ },

/***/ 187:
/*!**************************************************!*\
  !*** ./lib/bulbs-elements/util/move-children.js ***!
  \**************************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = moveChildren;
	function moveChildren(from, to) {
	  Array.prototype.forEach.call(Array.prototype.slice.call(from.childNodes), function (child) {
	    return to.appendChild(child);
	  });
	}

/***/ },

/***/ 188:
/*!***************************************************!*\
  !*** ./lib/bulbs-elements/util/copy-attribute.js ***!
  \***************************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = copyAttribute;
	function copyAttribute(attribute, from, to) {
	  to.setAttribute(attribute, from.getAttribute(attribute));
	}

/***/ },

/***/ 189:
/*!***************************************************************!*\
  !*** ./lib/bulbs-elements/util/supports-calc-in-transform.js ***!
  \***************************************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// Older versions of IE do not support css calc in transforms.
	// We can detect this feature by setting the transform style of
	// an element to a calc string. In non-supporting browsers, further
	// reads of this property will return an empty string.
	
	var _document$createEleme = document.createElement('div');
	
	var style = _document$createEleme.style;
	
	style.transform = 'translateX(calc(100% - 10px))';
	
	// This CANNOT be checked in the assignment expression.
	// non-supporting browsers will return the string with calc
	// from the assignment, and then the empty string on access.
	exports.default = style.transform !== '';

/***/ },

/***/ 190:
/*!*********************************************************!*\
  !*** ./elements/bulbs-carousel/bulbs-carousel-state.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _invariant = __webpack_require__(/*! invariant */ 1);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var HTMLCollection = document.body.children.constructor;
	
	var BulbsCarouselState = function () {
	  function BulbsCarouselState(props) {
	    _classCallCheck(this, BulbsCarouselState);
	
	    (0, _invariant2.default)(typeof props.currentIndex !== 'undefined', 'BulbsCarouselState requires a currentIndex property');
	
	    (0, _invariant2.default)(props.carouselItems && props.carouselItems.constructor === HTMLCollection, 'BulbsCarouselState requires a carouselItems property (must be a NodeList)');
	
	    (0, _invariant2.default)(props.carousel && props.carousel.tagName === 'BULBS-CAROUSEL', 'BulbsCarouselState requires access to a <bulbs-carousel> for width calculations');
	
	    this.props = props;
	  }
	
	  BulbsCarouselState.prototype.getActiveCarouselItem = function getActiveCarouselItem() {
	    return Array.prototype.find.call(this.props.carouselItems, function (item) {
	      return item.getAttribute('href') === window.location.pathname;
	    });
	  };
	
	  BulbsCarouselState.prototype.getGridRatio = function getGridRatio() {
	    if (this.firstItem) {
	      return this.getItemWidth() / this.props.carousel.offsetWidth || 0;
	    }
	    return 0;
	  };
	
	  BulbsCarouselState.prototype.getItemMargin = function getItemMargin() {
	    if (this.firstItem) {
	      var style = getComputedStyle(this.firstItem);
	      return (parseInt(style.marginLeft, 10) || 0) + (parseInt(style.marginRight, 10) || 0);
	    }
	    return 0;
	  };
	
	  BulbsCarouselState.prototype.getItemWidth = function getItemWidth() {
	    if (this.firstItem) {
	      return this.getItemMargin() + this.firstItem.offsetWidth;
	    }
	    return 0;
	  };
	
	  BulbsCarouselState.prototype.getChildrenPerPage = function getChildrenPerPage() {
	    if (this.firstItem) {
	      return Math.round(1 / this.getGridRatio());
	    }
	    return 0;
	  };
	
	  BulbsCarouselState.prototype.getCurrentPage = function getCurrentPage() {
	    if (this.firstItem) {
	      var perPage = this.getChildrenPerPage();
	      var page = Math.floor(this.props.currentIndex / perPage);
	      if (this.props.currentIndex === this.props.carouselItems.length && this.props.currentIndex % perPage === 0) {
	        return page - 1;
	      }
	      return page;
	    }
	    return 0;
	  };
	
	  BulbsCarouselState.prototype.updateCurrentIndex = function updateCurrentIndex(magnitude) {
	    var perPage = this.getChildrenPerPage();
	    var maxPage = parseInt(this.props.carouselItems.length / perPage, 10) - 1;
	    this.props.currentIndex = Math.max(0, this.props.currentIndex + parseInt(magnitude, 10));
	    if (this.props.currentIndex >= this.props.carouselItems.length) {
	      this.props.currentIndex -= perPage;
	    }
	    if (this.getCurrentPage() > maxPage) {
	      this.props.currentIndex = maxPage * perPage;
	    }
	  };
	
	  BulbsCarouselState.prototype.pageToCarouselItem = function pageToCarouselItem(item) {
	    var index = Array.prototype.indexOf.call(this.props.carouselItems, item);
	
	    if (index > -1) {
	      this.props.currentIndex = index;
	    }
	  };
	
	  BulbsCarouselState.prototype.slideToNext = function slideToNext() {
	    this.updateCurrentIndex(this.getChildrenPerPage());
	  };
	
	  BulbsCarouselState.prototype.slideToPrevious = function slideToPrevious() {
	    this.updateCurrentIndex(-this.getChildrenPerPage());
	  };
	
	  BulbsCarouselState.prototype.isOnfirstPage = function isOnfirstPage() {
	    return this.props.currentIndex === 0;
	  };
	
	  BulbsCarouselState.prototype.isOnLastPage = function isOnLastPage() {
	    return this.props.currentIndex + this.getChildrenPerPage() >= this.props.carouselItems.length;
	  };
	
	  _createClass(BulbsCarouselState, [{
	    key: 'firstItem',
	    get: function get() {
	      return this.props.carouselItems[0];
	    }
	  }]);
	
	  return BulbsCarouselState;
	}();
	
	exports.default = BulbsCarouselState;

/***/ },

/***/ 191:
/*!*****************************************************!*\
  !*** ./elements/bulbs-carousel/bulbs-carousel.scss ***!
  \*****************************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 195:
/*!*****************************************!*\
  !*** ./elements/bulbs-carousel/item.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _register = __webpack_require__(/*! bulbs-elements/register */ 2);
	
	var _util = __webpack_require__(/*! bulbs-elements/util */ 183);
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var CarouselItem = function (_BulbsHTMLElement) {
	  _inherits(CarouselItem, _BulbsHTMLElement);
	
	  function CarouselItem() {
	    _classCallCheck(this, CarouselItem);
	
	    return _possibleConstructorReturn(this, _BulbsHTMLElement.apply(this, arguments));
	  }
	
	  CarouselItem.prototype.createdCallback = function createdCallback() {
	    if (this.getAttribute('href')) {
	      var anchor = document.createElement('a');
	
	      (0, _util.copyAttribute)('data-track-action', this, anchor);
	      (0, _util.copyAttribute)('data-track-category', this, anchor);
	      (0, _util.copyAttribute)('href', this, anchor);
	
	      (0, _util.moveChildren)(this, anchor);
	
	      this.appendChild(anchor);
	    }
	  };
	
	  return CarouselItem;
	}(_register.BulbsHTMLElement);
	
	exports.default = CarouselItem;
	
	
	(0, _register.registerElement)('bulbs-carousel-item', CarouselItem);

/***/ },

/***/ 196:
/*!********************************************!*\
  !*** ./elements/bulbs-carousel/buttons.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PreviousButton = exports.NextButton = undefined;
	
	var _register = __webpack_require__(/*! bulbs-elements/register */ 2);
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var NextButton = exports.NextButton = function (_BulbsHTMLElement) {
	  _inherits(NextButton, _BulbsHTMLElement);
	
	  function NextButton() {
	    _classCallCheck(this, NextButton);
	
	    return _possibleConstructorReturn(this, _BulbsHTMLElement.apply(this, arguments));
	  }
	
	  NextButton.prototype.createdCallback = function createdCallback() {
	    this.innerHTML = '<i class="fa fa-angle-right"></i>';
	  };
	
	  return NextButton;
	}(_register.BulbsHTMLElement);
	
	var PreviousButton = exports.PreviousButton = function (_BulbsHTMLElement2) {
	  _inherits(PreviousButton, _BulbsHTMLElement2);
	
	  function PreviousButton() {
	    _classCallCheck(this, PreviousButton);
	
	    return _possibleConstructorReturn(this, _BulbsHTMLElement2.apply(this, arguments));
	  }
	
	  PreviousButton.prototype.createdCallback = function createdCallback() {
	    this.innerHTML = '<i class="fa fa-angle-left"></i>';
	  };
	
	  return PreviousButton;
	}(_register.BulbsHTMLElement);
	
	(0, _register.registerElement)('bulbs-carousel-next', NextButton);
	(0, _register.registerElement)('bulbs-carousel-previous', PreviousButton);

/***/ }

});
//# sourceMappingURL=bulbs-carousel.js.map