import React, { PropTypes } from 'react';

export default function DfpPixel (props) {
  let targeting = {
    dfp_placement: props.placement,
    dfp_campaign_id: props.campaignId,
  };

  return (
    <div
        data-ad-unit="campaign-pixel"
        data-targeting={ JSON.stringify(targeting) }>
    </div>
  );
}

DfpPixel.propTypes = {
  campaignId: PropTypes.number.isRequired,
  placement: PropTypes.string.isRequired,
};
