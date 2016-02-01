import React, { PropTypes } from 'react';
import register from 'bulbs-elements/register';

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
  thisProp: PropTypes.string,
};

register('sample-element', SampleElement);
