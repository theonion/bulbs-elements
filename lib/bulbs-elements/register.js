import 'dom4';
import 'document-register-element';
import 'document-register-element/build/innerHTML';
import es6Promise from 'es6-promise';
es6Promise.polyfill();
import 'isomorphic-fetch';

import ReactDOM from 'react-dom';
import React from 'react';
import camelcase from 'camelcase';

function BaseElement () {}
BaseElement.prototype = HTMLElement.prototype;

export default function register (tagName, ReactComponent) {
  class ReactWrapper extends BaseElement {
    createdCallback () {
      this.reactElement = ReactDOM.render(React.createElement(ReactComponent, this.attributesHash), this);
    }

    get attributesHash () {
      let attributes = {};
      for (let index = 0; index < this.attributes.length; index = index + 1) {
        let attribute = this.attributes[index];
        let key = camelcase(attribute.name);
        attributes[key] = attribute.value;
      }
      return attributes;
    }
  }

  document.registerElement(tagName, ReactWrapper);
}

