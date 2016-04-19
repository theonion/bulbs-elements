import React, { PropTypes } from 'react';

export default function Preamble(props) {
  return <span className='campaign-display-preamble'>{props.text}</span>;
}

Preamble.propTypes = {
  text: PropTypes.string.isRequired,
};
