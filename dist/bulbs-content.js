webpackJsonp([4],{

/***/ 0:
/*!*************************************************!*\
  !*** ./elements/bulbs-content/bulbs-content.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _register = __webpack_require__(/*! bulbs-elements/register */ 2);
	
	__webpack_require__(/*! ./bulbs-content.scss */ 215);
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var BulbsContent = function (_BulbsHTMLElement) {
	  _inherits(BulbsContent, _BulbsHTMLElement);
	
	  function BulbsContent() {
	    _classCallCheck(this, BulbsContent);
	
	    return _possibleConstructorReturn(this, _BulbsHTMLElement.apply(this, arguments));
	  }
	
	  BulbsContent.prototype.attachedCallback = function attachedCallback() {
	    if (!this.hasDispatchedReadyEvent) {
	      var event = new CustomEvent('bulbs-content-ready');
	      this.dispatchEvent(event);
	      this.hasDispatchedReadyEvent = true;
	    }
	  };
	
	  return BulbsContent;
	}(_register.BulbsHTMLElement);
	
	(0, _register.registerElement)('bulbs-content', BulbsContent);

/***/ },

/***/ 215:
/*!***************************************************!*\
  !*** ./elements/bulbs-content/bulbs-content.scss ***!
  \***************************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=bulbs-content.js.map