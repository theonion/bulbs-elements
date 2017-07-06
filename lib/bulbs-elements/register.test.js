import React from 'react';
import { registerReactElement } from './register-react';

class TestElement extends React.Component {
  sayYes () {
    return 'yes';
  }

  render () {
    return <div/>;
  }
}

Object.assign(TestElement, {
  extendDOM: {
    domExtensionMethod () {
      return 'extended-dom';
    },

    doesItAccess () {
      return this.reactInstance.sayYes();
    },
  },
});

registerReactElement('test-element', TestElement);

describe('registerReactElement', () => {
  it('extends dom element', () => {
    let el = document.createElement('test-element');
    expect(el.domExtensionMethod()).to.eql('extended-dom');
  });

  it('dom extensions have access to the react instance', () => {
    let el = document.createElement('test-element');
    el.doRender();
    expect(el.doesItAccess()).to.eql('yes');
  });
});
