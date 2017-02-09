webpackJsonp([0],[
/* 0 */
/*!*************************************************!*\
  !*** ./elements/bulbs-article/bulbs-article.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _register = __webpack_require__(/*! bulbs-elements/register */ 1);
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	function BulbsHTMLBodyElement() {}
	BulbsHTMLBodyElement.prototype = HTMLArticleElement.prototype;
	
	var BulbsArticleBody = function (_BulbsHTMLBodyElement) {
	  _inherits(BulbsArticleBody, _BulbsHTMLBodyElement);
	
	  function BulbsArticleBody() {
	    _classCallCheck(this, BulbsArticleBody);
	
	    return _possibleConstructorReturn(this, _BulbsHTMLBodyElement.apply(this, arguments));
	  }
	
	  BulbsArticleBody.prototype.addDingbat = function addDingbat() {
	    var Dingbat = function Dingbat(selector) {
	      var dingbat = $(selector);
	      var $lastElement = $('.article-text > :last-child');
	      var appendDingbat = function appendDingbat(elem) {
	        if (elem.is('ul')) {
	          // appends to .article-text > ul > li:last-child
	          elem.children('li:last-child').append(dingbat);
	        } else if (elem.is('div')) {
	          if (elem.find('> :last-child').is('p')) {
	            // appends to .article-text > div > p:last-child
	            elem.find('> :last-child').append(dingbat);
	          } else {
	            // appends to .article-text > div:last-child
	            elem.append(dingbat);
	          }
	        } else if (elem.is('p')) {
	          // Handle extraneous br tags
	          if (elem.children('br').length) {
	            // targets .article-text > p:last-child > before br:last-child
	            elem.children('br:last-child').before(dingbat);
	          } else {
	            // targets .article-text > p:last-child
	            elem.append(dingbat);
	          }
	        }
	      };
	
	      if ($lastElement.text()) {
	        appendDingbat($lastElement);
	      } else {
	        appendDingbat($lastElement.prev());
	      }
	    };
	
	    module.exports = Dingbat;
	  };
	
	  BulbsArticleBody.prototype.attachedCallback = function attachedCallback() {
	    // cool stuff
	  };
	
	  return BulbsArticleBody;
	}(BulbsHTMLBodyElement);
	
	BulbsArticleBody.extends = 'article';
	
	(0, _register.registerElement)('bulbs-article', BulbsArticleBody);

/***/ }
]);
//# sourceMappingURL=bulbs-article.js.map