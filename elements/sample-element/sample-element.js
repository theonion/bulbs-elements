import React from 'react';
import { register } from '../core';

export default class SampleElement extends React.Component {
  render () {
    return (
      <div>
        <h1>Check out this SICK example!</h1>
        <p>It is so effin SICK!</p>
        <span className="prop-text">{ this.props.thisProp }</span>
      </div>
    );
  }
}

SampleElement.propTypes = {
  thisProp: React.PropTypes.string,
};

SampleElement.displayName = 'SampleElement';

register('sample-element', SampleElement);
