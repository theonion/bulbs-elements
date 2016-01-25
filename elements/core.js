import 'dom4';
import 'document-register-element';
import 'document-register-element/build/innerHTML';
import ReactDOM from 'react-dom';
import React from 'react';
import camelcase from 'camelcase';

export class BulbsElement extends React.Component {
  constructor (props) {
    super(props);
    this.store = new this.constructor.store(this);
    setImmediate(this.initialDispatch.bind(this));
  }

  initialDispatch () { }
}

function BaseElement () {}
BaseElement.prototype = HTMLElement.prototype;

export function register (tagName, ReactComponent) {
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

import mapObject from 'object-map-to-array';
export function testElement (title, testFunction) {
  describe(title, function () {
    beforeEach(function (done) {
      this.renderElement = function ({ tag, props, done }) {
        let propList = mapObject(props, (_, key) => `${key}='${props[key]}'`);
        this.container.innerHTML = `<${tag} ${propList.join(' ')}></${tag}>`;
        done ? setImmediate(() => done()) : null;
        return this.container.querySelector(tag);
      };
      this.container = document.createElement('div');
      document.body.appendChild(this.container);
      done();
    });

    afterEach(function () {
      document.body.removeChild(this.container);
    });

    testFunction.call(this);
  });
}
