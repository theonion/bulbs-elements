import 'dom4';
import 'document-register-element';
import 'document-register-element/build/innerHTML';
import ReactDOM from 'react-dom';
import React from 'react';
import camelcase from 'camelcase';

function BaseElement () {}
BaseElement.prototype = HTMLElement.prototype;

export function register (tagName, ReactComponent) {
  class ReactWrapper extends BaseElement {
    createdCallback () {
      ReactDOM.render(React.createElement(ReactComponent, this.attributesHash), this);
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
