/* eslint react/prop-types: 0*/
import React, { Component, PropTypes } from 'react';

export default class Contestant extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (<div className='Contestant'>{this.props.name}</div>);
  }
}

Object.assign(Contestant, {
  propTypes: {
    name: PropTypes.string.isRequired,
  },
});
