webpackJsonp([0],[
/* 0 */
/*!***********************************************!*\
  !*** ./elements/bulbs-anchor/bulbs-anchor.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _register = __webpack_require__(/*! bulbs-elements/register */ 1);
	
	var _invariant = __webpack_require__(/*! invariant */ 36);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./bulbs-anchor.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var BulbsAnchor = function (_BulbsHTMLElement) {
	  _inherits(BulbsAnchor, _BulbsHTMLElement);
	
	  function BulbsAnchor() {
	    _classCallCheck(this, BulbsAnchor);
	
	    return _possibleConstructorReturn(this, _BulbsHTMLElement.apply(this, arguments));
	  }
	
	  BulbsAnchor.prototype.attachedCallback = function attachedCallback() {
	    this.anchoredElement = this.getAnchoredElement(this);
	    this.positionElement.bind(this);
	    this.positionElement();
	
	    window.addEventListener('resize', this.positionElement.bind(this));
	  };
	
	  BulbsAnchor.prototype.getAnchoredElement = function getAnchoredElement(el) {
	    var anchorElementAttr = el.getAttribute('anchor');
	    return document.querySelector(anchorElementAttr);
	  };
	
	  BulbsAnchor.prototype.getAnchorPosition = function getAnchorPosition() {
	    return this.anchorElement.getBoundingClientRect().left;
	  };
	
	  BulbsAnchor.prototype.positionElement = function positionElement() {
	    this.style.left = this.getAnchorPosition() + '';
	  };
	
	  return BulbsAnchor;
	}(_register.BulbsHTMLElement);
	
	exports.default = BulbsAnchor;
	
	
	(0, _register.registerElement)('bulbs-anchor', BulbsAnchor);

/***/ }
]);
//# sourceMappingURL=bulbs-anchor.js.map