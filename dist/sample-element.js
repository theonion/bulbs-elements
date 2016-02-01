webpackJsonp([11],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';
	
	var _index = __webpack_require__(238);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _index3 = __webpack_require__(244);
	
	var _index4 = _interopRequireDefault(_index3);
	
	var _react2 = __webpack_require__(50);
	
	var _react3 = _interopRequireDefault(_react2);
	
	var _index5 = __webpack_require__(245);
	
	var _index6 = _interopRequireDefault(_index5);
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _register = __webpack_require__(288);
	
	var _register2 = _interopRequireDefault(_register);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _components = {
	  SampleElement: {
	    displayName: 'SampleElement'
	  }
	};
	
	var _UsersCollinmillerCodeBulbsElementsNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
	  filename: '/Users/collinmiller/Code/bulbs-elements/elements/sample-element/sample-element.js',
	  components: _components,
	  locals: [module],
	  imports: [_react3.default]
	});
	
	var _UsersCollinmillerCodeBulbsElementsNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
	  filename: '/Users/collinmiller/Code/bulbs-elements/elements/sample-element/sample-element.js',
	  components: _components,
	  locals: [],
	  imports: [_react3.default, _index2.default]
	});
	
	function _wrapComponent(id) {
	  return function (Component) {
	    return _UsersCollinmillerCodeBulbsElementsNode_modulesReactTransformHmrLibIndexJs2(_UsersCollinmillerCodeBulbsElementsNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
	  };
	}
	
	var SampleElement = _wrapComponent('SampleElement')(function (_React$Component) {
	  _inherits(SampleElement, _React$Component);
	
	  function SampleElement() {
	    _classCallCheck(this, SampleElement);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(SampleElement).apply(this, arguments));
	  }
	
	  _createClass(SampleElement, [{
	    key: 'render',
	    value: function render() {
	      return _react3.default.createElement(
	        'div',
	        null,
	        _react3.default.createElement(
	          'h1',
	          null,
	          'Check out this SICK example!'
	        ),
	        _react3.default.createElement(
	          'p',
	          null,
	          'It is so effin SICK!'
	        ),
	        _react3.default.createElement(
	          'span',
	          { className: 'prop-text' },
	          this.props.thisProp
	        )
	      );
	    }
	  }]);
	
	  return SampleElement;
	}(_react3.default.Component));
	
	exports.default = SampleElement;
	
	SampleElement.propTypes = {
	  thisProp: _react2.PropTypes.string
	};
	
	(0, _register2.default)('sample-element', SampleElement);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(237)(module)))

/***/ }
]);
//# sourceMappingURL=sample-element.js.map