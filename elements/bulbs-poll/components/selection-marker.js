import React, { PropTypes } from 'react';

export default function SelectionMarker (props) {
  let {
    isSelected,
  } = props;

  return (
    <svg width="20px" height="20px">
      <circle cx="10" cy="10" r="8" fill="none" stroke="black" strokeWidth="2px" />
      <circle cx="10" cy="10" r="5" fill={isSelected ? 'black' : 'none' } />
    </svg>
  );
}

SelectionMarker.propTypes = {
  isSelected: PropTypes.bool,
};
