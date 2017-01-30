webpackJsonp([19],[
/* 0 */
/*!*******************************************************!*\
  !*** ./elements/bulbs-scroll-top/bulbs-scroll-top.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _register = __webpack_require__(/*! bulbs-elements/register */ 2);
	
	var _invariant = __webpack_require__(/*! invariant */ 1);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var ScrollTop = function (_BulbsHTMLElement) {
	  _inherits(ScrollTop, _BulbsHTMLElement);
	
	  function ScrollTop() {
	    _classCallCheck(this, ScrollTop);
	
	    return _possibleConstructorReturn(this, _BulbsHTMLElement.apply(this, arguments));
	  }
	
	  ScrollTop.prototype.createdCallback = function createdCallback() {
	    (0, _invariant2.default)(this.getAttribute('duration') < 0, '<bulbs-scroll-top> MUST have a positive integer for duration');
	  };
	
	  ScrollTop.prototype.attachedCallback = function attachedCallback() {
	    this.step = this.step.bind(this);
	    this.addEventListener('click', this.scrollToTop.bind(this));
	  };
	
	  ScrollTop.prototype.setParams = function setParams() {
	    return {
	      cosParameter: window.scrollY / 2,
	      scrollCount: 0,
	      oldTimestamp: window.performance.now(),
	      duration: this.getAttribute('duration') || 400
	    };
	  };
	
	  ScrollTop.prototype.scrollToTop = function scrollToTop() {
	    var _this2 = this;
	
	    params = this.setParams(this);
	    window.requestAnimationFrame(function (timestamp) {
	      _this2.step(timestamp, params);
	    });
	  };
	
	  ScrollTop.prototype.step = function step(newTimestamp, params) {
	    var _this3 = this;
	
	    var timeDifference = newTimestamp - params.oldTimestamp;
	    params.scrollCount = params.scrollCount + Math.PI / (params.duration / timeDifference);
	    if (params.scrollCount >= Math.PI) {
	      window.scrollTo(0, 0);
	    }
	    if (window.scrollY === 0) {
	      return;
	    }
	    var moveStep = Math.round(2 * params.cosParameter * Math.cos(params.scrollCount));
	    window.scrollTo(0, moveStep);
	    params.oldTimestamp = newTimestamp;
	
	    window.requestAnimationFrame(function (timestamp) {
	      _this3.step(timestamp, params);
	    });
	  };
	
	  return ScrollTop;
	}(_register.BulbsHTMLElement);
	
	exports.default = ScrollTop;
	
	
	(0, _register.registerElement)('bulbs-scroll-top', ScrollTop);

/***/ }
]);
//# sourceMappingURL=bulbs-scroll-top.js.map