import React, { PropTypes } from 'react';

export default function SelectionMarker (props) {
  let {
    isSelected,
  } = props;

  let diameter = 20;
  let radius = diameter / 2;
  let stroke = 1 / 5 * diameter;

  return (
    <svg
      width={`${diameter}px`}
      height={`${diameter}px`}
    >
      <circle
        cx={radius}
        cy={radius}
        r={radius - stroke}
        fill="none"
        stroke="black"
        strokeWidth={`${radius - stroke}px`}
      />
      <circle
        cx={radius}
        cy={radius}
        r={radius / 2}
        fill={isSelected ? 'black' : 'none' }
      />
    </svg>
  );
}

SelectionMarker.propTypes = {
  isSelected: PropTypes.bool,
};
