import React from 'react';
import examples from './data';

export default class Component extends React.Component {
  renderExample () {
    let example = examples.find((anExample) => {
      return anExample.element === this.props.params.element;
    });
    return {
      __html: example.examples[this.props.params.example].render(),
    };
  }

  render () {
    try {
      return (
        <div dangerouslySetInnerHTML={this.renderExample()} />
      );
    }
    catch (error) {
      let knownError;
      switch (error.message) {
        case "Cannot read property 'render' of undefined":
          knownError = "The example for this url does not exist."
          break;
      }
      return (
        <div
          style={{
            padding: '1em',
          }}
        >
          <code>
            <h1
              style={{
                color: 'red',
              }}
            >
              Failed to render example at:
            </h1>
            <a href={location.href}>
              { location.href }
            </a>

            <h2
              style={{
              }}
            >
              {knownError}  
            </h2>

            <hr/>
            {
              error.stack.split('\n').map((line) => {
                return (
                  <div
                    style={{
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {line}
                  </div>
                );
              })
            }
          </code>
        </div>
      );
    }
  }
}

