import React, { PropTypes } from 'react';

export default function VideoMetaCampaign (props) {
  return (
    <campaign-display
      data-track-action={props.campaignTrackAction}
      placement={props.campaignPlacement}
      preamble-text={props.campaignPreamble}
      src={props.campaignUrl}
      name-only
    />
  );
}

VideoMetaCampaign.displayName = 'VideoMetaCampaign';

VideoMetaCampaign.propTypes = {
  campaignPlacement: PropTypes.string.isRequired,
  campaignPreamble: PropTypes.string.isRequired,
  campaignTrackAction: PropTypes.string.isRequired,
  campaignUrl: PropTypes.string.isRequired,
};
