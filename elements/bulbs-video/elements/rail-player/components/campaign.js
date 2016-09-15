/* eslint-disable react/prop-types */
// This gets identical props as RailPlayerRoot

import React from 'react';

export default function RailPlayerCampaign (props) {
  if (props.video.tunic_campaign_url) {
    return (
      <campaign-display
        class='rail-player-content-sponsorship'
        src={props.video.tunic_campaign_url}
        data-track-action='Sponsor'
        data-track-label={props.video.tunic_campaign_url}
        preamble-text='Sponsored By'
        placement='rail-player'
        name-only
      />
    );
  }

  return null;
}

RailPlayerCampaign.displayName = 'RailPlayerCampaign';
