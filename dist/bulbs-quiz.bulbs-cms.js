webpackJsonp([3],[
/* 0 */
/*!***********************************************!*\
  !*** ./elements/bulbs-quiz/bulbs-quiz-cms.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _register = __webpack_require__(/*! bulbs-elements/register */ 37);
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var EmbeddedBulbsQuiz = function (_EmbededCMSElement) {
	  _inherits(EmbeddedBulbsQuiz, _EmbededCMSElement);
	
	  function EmbeddedBulbsQuiz() {
	    _classCallCheck(this, EmbeddedBulbsQuiz);
	
	    return _possibleConstructorReturn(this, _EmbededCMSElement.apply(this, arguments));
	  }
	
	  _createClass(EmbeddedBulbsQuiz, [{
	    key: 'embedContentPreview',
	    get: function get() {
	      return '\n      <h1 style=\'text-align: center; font-family: "Droid Serif"\'>\n        <i class=\'fa fa-puzzle-piece\'></i>\n        Embedded BulbsQuiz\n      </h1>\n    ';
	    }
	  }]);
	
	  return EmbeddedBulbsQuiz;
	}(_register.EmbededCMSElement);
	
	(0, _register.registerElement)('bulbs-quiz', EmbeddedBulbsQuiz);

/***/ }
]);
//# sourceMappingURL=bulbs-quiz.bulbs-cms.js.map