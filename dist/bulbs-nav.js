webpackJsonp([13],{

/***/ 0:
/*!*****************************************!*\
  !*** ./elements/bulbs-nav/bulbs-nav.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _register = __webpack_require__(/*! bulbs-elements/register */ 1);
	
	__webpack_require__(/*! ./bulbs-nav.scss */ 269);
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var SCROLL_DISTANCE_TO_CLOSE = -150;
	
	var NavStateManager = {
	  state: {},
	
	  requestClose: function requestClose(element) {
	    var _this = this;
	
	    this.state[element.getAttribute('nav-name')] = {
	      element: element,
	      frameRequest: requestAnimationFrame(function () {
	        delete _this.state[element.getAttribute('nav-name')];
	        element.close();
	      })
	    };
	  },
	  cancelClose: function cancelClose(element) {
	    var stateInfo = this.state[element.getAttribute('nav-name')];
	    if (stateInfo) {
	      cancelAnimationFrame(stateInfo.frameRequest);
	      delete this.state[element.getAttribute('nav-name')];
	    }
	  }
	};
	
	var BulbsNavToggle = function (_BulbsHTMLElement) {
	  _inherits(BulbsNavToggle, _BulbsHTMLElement);
	
	  function BulbsNavToggle() {
	    _classCallCheck(this, BulbsNavToggle);
	
	    return _possibleConstructorReturn(this, _BulbsHTMLElement.apply(this, arguments));
	  }
	
	  BulbsNavToggle.prototype.createdCallback = function createdCallback() {
	    var _this3 = this;
	
	    this.addEventListener('mouseenter', function () {
	      return _this3.openNavPanel();
	    });
	    this.addEventListener('mouseleave', function () {
	      return _this3.navPanel.requestClose();
	    });
	  };
	
	  BulbsNavToggle.prototype.openNavPanel = function openNavPanel() {
	    NavStateManager.cancelClose(this.navPanel);
	    this.navPanel.open();
	  };
	
	  BulbsNavToggle.prototype.toggleNavPanel = function toggleNavPanel() {
	    this.navPanel.toggle();
	  };
	
	  _createClass(BulbsNavToggle, [{
	    key: 'navPanel',
	    get: function get() {
	      var navName = this.getAttribute('nav-name');
	      return document.querySelector('bulbs-nav-panel[nav-name=\'' + navName + '\']');
	    }
	  }]);
	
	  return BulbsNavToggle;
	}(_register.BulbsHTMLElement);
	
	var BulbsNavPanel = function (_BulbsHTMLElement2) {
	  _inherits(BulbsNavPanel, _BulbsHTMLElement2);
	
	  function BulbsNavPanel() {
	    _classCallCheck(this, BulbsNavPanel);
	
	    return _possibleConstructorReturn(this, _BulbsHTMLElement2.apply(this, arguments));
	  }
	
	  BulbsNavPanel.prototype.createdCallback = function createdCallback() {
	    var _this5 = this;
	
	    this.addEventListener('mouseleave', function () {
	      return _this5.requestClose();
	    });
	    this.addEventListener('mouseenter', function () {
	      return _this5.open();
	    });
	    this.scrollHandler = this.scrollHandler.bind(this);
	  };
	
	  BulbsNavPanel.prototype.scrollHandler = function scrollHandler() {
	    if (this.getBoundingClientRect().top < SCROLL_DISTANCE_TO_CLOSE) {
	      this.close();
	    }
	  };
	
	  BulbsNavPanel.prototype.requestClose = function requestClose() {
	    NavStateManager.requestClose(this);
	  };
	
	  BulbsNavPanel.prototype.open = function open() {
	    NavStateManager.cancelClose(this);
	    if (!this.classList.contains('bulbs-nav-panel-active')) {
	      [].forEach.call(this.otherPanels, function (otherPanel) {
	        return otherPanel.close();
	      });
	      this.classList.add('bulbs-nav-panel-active');
	      this.navToggle.classList.add('bulbs-nav-toggle-active');
	      if (this.tabGroup) {
	        this.tabGroup.resetSelection();
	      }
	      if (window.picturefill) {
	        window.picturefill();
	      }
	      window.addEventListener('scroll', this.scrollHandler);
	    }
	  };
	
	  BulbsNavPanel.prototype.close = function close() {
	    this.classList.remove('bulbs-nav-panel-active');
	    this.navToggle.classList.remove('bulbs-nav-toggle-active');
	    window.removeEventListener('scroll', this.scrollHandler);
	  };
	
	  BulbsNavPanel.prototype.toggle = function toggle() {
	    if (this.classList.contains('bulbs-nav-panel-active')) {
	      this.close();
	    } else {
	      this.open();
	    }
	  };
	
	  _createClass(BulbsNavPanel, [{
	    key: 'tabGroup',
	    get: function get() {
	      return this.querySelector('bulbs-tabs');
	    }
	  }, {
	    key: 'navToggle',
	    get: function get() {
	      var navName = this.getAttribute('nav-name');
	      return document.querySelector('bulbs-nav-toggle[nav-name=\'' + navName + '\']');
	    }
	  }, {
	    key: 'otherPanels',
	    get: function get() {
	      var _this6 = this;
	
	      return [].filter.call(this.parentNode.querySelectorAll('bulbs-nav-panel'), function (child) {
	        return child !== _this6;
	      });
	    }
	  }]);
	
	  return BulbsNavPanel;
	}(_register.BulbsHTMLElement);
	
	(0, _register.registerElement)('bulbs-nav-toggle', BulbsNavToggle);
	(0, _register.registerElement)('bulbs-nav-panel', BulbsNavPanel);

/***/ },

/***/ 269:
/*!*******************************************!*\
  !*** ./elements/bulbs-nav/bulbs-nav.scss ***!
  \*******************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=bulbs-nav.js.map