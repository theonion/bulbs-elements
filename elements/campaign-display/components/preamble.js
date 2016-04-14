import React, { PropTypes } from 'react';

export default function Preamble(props) {
  return (<span>{props.text}</span>);
}

Preamble.propTypes = {
  text: PropTypes.string.isRequired,
};
