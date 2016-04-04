import React, { PropTypes } from 'react';
import classnames from 'classnames';

export default function CampaignDisplayRoot () {
  let className = classnames('campaign-display-campaign-display-root', {});

  return (
    <div className={className}>
    </div>
  );
}

CampaignDisplayRoot.propTypes = {
  data: PropTypes.object.isRequired,
  display: PropTypes.oneOf(['image', 'name']).isRequired,
};
