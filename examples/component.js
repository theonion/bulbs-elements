import React from 'react';
import examples from './data';

export default class Component extends React.Component {
  render () {
    return (
      <div dangerouslySetInnerHTML={this.renderExample()} />
    );
  }

  renderExample () {
    let example = examples.find((example) => {
      return example.element === this.props.params.element;
    });
    return {
      __html: example.examples[this.props.params.example].render(),
    };
  }
}

