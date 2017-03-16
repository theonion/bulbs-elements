webpackJsonp([11],{

/***/ 0:
/*!***************************************************!*\
  !*** ./elements/bulbs-lightbox/bulbs-lightbox.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _register = __webpack_require__(/*! bulbs-elements/register */ 1);
	
	__webpack_require__(/*! ./bulbs-lightbox.scss */ 257);
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var BulbsLightBox = function (_BulbsHTMLElement) {
	  _inherits(BulbsLightBox, _BulbsHTMLElement);
	
	  function BulbsLightBox() {
	    _classCallCheck(this, BulbsLightBox);
	
	    return _possibleConstructorReturn(this, _BulbsHTMLElement.apply(this, arguments));
	  }
	
	  BulbsLightBox.prototype.toggleOverlay = function toggleOverlay() {
	    if (this.classList.contains('active')) {
	      this.classList.remove('active');
	    } else if (!this.classList.contains('active')) {
	      this.classList.add('active');
	      if (window.picturefill) {
	        window.picturefill();
	      }
	    }
	  };
	
	  BulbsLightBox.prototype.attachedCallback = function attachedCallback() {
	    this.addEventListener('click', this.toggleOverlay.bind(this));
	  };
	
	  return BulbsLightBox;
	}(_register.BulbsHTMLElement);
	
	(0, _register.registerElement)('bulbs-lightbox', BulbsLightBox);
	
	exports.default = BulbsLightBox;

/***/ },

/***/ 257:
/*!*****************************************************!*\
  !*** ./elements/bulbs-lightbox/bulbs-lightbox.scss ***!
  \*****************************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=bulbs-lightbox.js.map