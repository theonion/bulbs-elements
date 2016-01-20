import React from 'react';
import { register } from './../core';

export default class SampleElement extends React.Component {
  render () {
    console.log(this.props);
    return (
      <div>
        <h1>Check out this SICK example!</h1>
        <p>It is so effin SICK!</p>
      </div>
    );
  }
}

SampleElement.displayName = 'SampleElement';

register('sample-element', SampleElement);

/*
//
//
//
//# bulbs-elements/lib/core
//
//
//
//function register(elementName, reactClass) {
//  class ElementClass extends HTMLElement {
//    createdCallback () {
//      React.render(this, reactClass, this.attributes);
//    }
//  }
//  document.register(elementName, ElementClass);
//}
//
//
//##
//core = require('bulbs-elements/lib/core');
//core.register('sample-element', require('bulbs-elements/dist/sample-element'))
//
//<sample-element id="foo" bar="{ votes: [1,2,3]}"></sample-element>
//
//
//##
//css built by itself too
*/
