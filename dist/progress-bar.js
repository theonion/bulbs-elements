webpackJsonp([34],{

/***/ 0:
/*!***********************************************!*\
  !*** ./elements/progress-bar/progress-bar.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _register = __webpack_require__(/*! bulbs-elements/register */ 2);
	
	__webpack_require__(/*! ./progress-bar.scss */ 487);
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	function invertProgress(progress) {
	  return 100 - progress;
	}
	
	var ProgressBar = function (_BulbsHTMLElement) {
	  _inherits(ProgressBar, _BulbsHTMLElement);
	
	  function ProgressBar() {
	    _classCallCheck(this, ProgressBar);
	
	    return _possibleConstructorReturn(this, _BulbsHTMLElement.apply(this, arguments));
	  }
	
	  ProgressBar.prototype.attachedCallback = function attachedCallback() {
	    var progress = parseInt(this.getAttribute('progress'), 10) || 0;
	    this.innerHTML = '<div class="progress-track" style="width: ' + invertProgress(progress) + '%"></div>';
	  };
	
	  ProgressBar.prototype.attributeChangedCallback = function attributeChangedCallback(name, previousValue, value) {
	    if (name === 'progress' && this.children.length) {
	      this.querySelector('.progress-track').style.width = invertProgress(value) + '%';
	    }
	  };
	
	  return ProgressBar;
	}(_register.BulbsHTMLElement);
	
	(0, _register.registerElement)('progress-bar', ProgressBar);
	
	exports.default = ProgressBar;

/***/ },

/***/ 487:
/*!*************************************************!*\
  !*** ./elements/progress-bar/progress-bar.scss ***!
  \*************************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=progress-bar.js.map