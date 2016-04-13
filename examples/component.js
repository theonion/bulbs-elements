/*eslint react/no-unknown-property: "off"*/
import React from 'react';
import examples from './element-examples';

class Component extends React.Component {
  renderExample () {
    let example = examples.find((exmpl) => {
      return exmpl.element === this.props.params.element;
    });
    return {
      __html: example.examples[this.props.params.example].render(),
    };
  }

  render () {
    return (
      <div dangerouslySetInnerHTML={this.renderExample()} />
    );
  }
}

export default Component;
