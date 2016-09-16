import React from 'react';
import { registerReactElement } from './register';

class TestElement extends React.Component {
  render () {
    return <div/>;
  }
}

Object.assign(TestElement, {
  extendDOM: {
    domExtensionMethod () {
      return 'extended-dom';
    },
  },
});

registerReactElement('test-element', TestElement);

describe('registerReactElement', () => {
  it('extends dom element', () => {
    let el = document.createElement('test-element');
    expect(el.domExtensionMethod()).to.eql('extended-dom');
  });
});
