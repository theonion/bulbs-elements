import React from 'react';
import examples from './data';

export default class Component extends React.Component {
  render () {
    return (
      <div>
        <h1>
          {this.props.params.element} {this.props.params.example}
        </h1>
        <div dangerouslySetInnerHTML={this.renderExample()} />
      </div>
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

