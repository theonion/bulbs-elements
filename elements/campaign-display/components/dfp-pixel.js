import React, { PropTypes } from 'react';

export default function DfpPixel (props) {
  return (
    <div
        data-ad-unit={ props.adUnitName }
        data-targeting={ props.targetingParams }>
    </div>
  );
};

DfpPixel.propTypes = {
  adUnitName: PropTypes.string.isRequired,
  targetingParams: PropTypes.object,
};
