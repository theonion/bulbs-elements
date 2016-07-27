/* eslint react/no-unknown-property: "off" */
/* eslint-disable react/prop-types, react/no-danger */

import React from 'react';
import examples from './element-examples';

import iFrameResize from 'iframe-resizer/js/iframeResizer';

class Component extends React.Component {
  get example () {
    return examples.find((exmpl) => {
      return exmpl.element === this.props.params.element;
    });
  }

  get exampleSpec () {
    return this.example.examples[this.props.params.example];
  }

  renderExample () {
    return {
      __html: this.exampleSpec.render(),
    };
  }

  componentDidMount () {
    this.testChangeSource = new EventSource('/test-update-stream');
    this.testChangeSource.onmessage = () => {
      this.refs.iframe.src = this.refs.iframe.src;
    };
    if (this.exampleSpec.before) {
      this.exampleSpec.before(this.refs.canvas);
    }
  }

  componentWillUnmount () {
    this.testChangeSource.close();
    if (this.examples.after) {
      this.exampleSpec.after(this.refs.canvas);
    }
  }

  render () {
    return (
      <div className='example'>
        <div className='example-canvas' ref="canvas" dangerouslySetInnerHTML={this.renderExample()} />
        <iframe
          ref='iframe'
          className='test-suite'
          src={`//localhost:9876/debug.html?grep=<${this.example.element}>`}
        />
      </div>
    );
  }
}

export default Component;
