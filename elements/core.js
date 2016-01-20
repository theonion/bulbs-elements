import 'document-register-element';
import ReactDOM from 'react-dom';
import React from 'react';

export function register (tagName, ReactComponent) {
  class ReactWrapper extends HTMLElement {
    createdCallback () {
      ReactDOM.render(React.createElement(ReactComponent, this.attributes), this);
    }
  }
  document.registerElement(tagName, ReactWrapper);
}
