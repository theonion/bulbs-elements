import React, { PropTypes } from 'react';

import Revealed from './revealed';
import Cover from './cover';

export default function Root (props) {
  let className = 'bulbs-video-root player';

  if (!props.video) {
    return <div className={className}/>;
  }
  else if (props.controller.revealed) {
    return (
      <div className={className}>
        <Revealed {...props}/>
      </div>
    );
  }

  return (
    <div className={className}>
      <Cover video={props.video} actions={props.actions}/>
    </div>
  );
}

Root.propTypes = {
  actions: PropTypes.object.isRequired,
  autoplayNext: PropTypes.bool,
  controller: PropTypes.object.isRequired,
  muted: PropTypes.bool,
  noEndcard: PropTypes.bool,
  targetCampaignId: PropTypes.string,
  targetCampaignNumber: PropTypes.string,
  targetHostChannel: PropTypes.string,
  targetSpecialCoverage: PropTypes.string,
  twitterHandle: PropTypes.string,
  video: PropTypes.object,
};
