webpackJsonp([11],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(50);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _register = __webpack_require__(236);
	
	var _register2 = _interopRequireDefault(_register);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SampleElement = function (_React$Component) {
	  _inherits(SampleElement, _React$Component);
	
	  function SampleElement() {
	    _classCallCheck(this, SampleElement);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(SampleElement).apply(this, arguments));
	  }
	
	  _createClass(SampleElement, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'h1',
	          null,
	          'Check out this SICK example!'
	        ),
	        _react2.default.createElement(
	          'p',
	          null,
	          'It is so effin SICK!'
	        ),
	        _react2.default.createElement(
	          'span',
	          { className: 'prop-text' },
	          this.props.thisProp
	        )
	      );
	    }
	  }]);
	
	  return SampleElement;
	}(_react2.default.Component);
	
	exports.default = SampleElement;
	
	SampleElement.propTypes = {
	  thisProp: _react.PropTypes.string
	};
	
	SampleElement.displayName = 'SampleElement';
	
	(0, _register2.default)('sample-element', SampleElement);

/***/ }
]);
//# sourceMappingURL=sample-element.js.map