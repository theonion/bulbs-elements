import React, { PropTypes } from 'react';

import Revealed from './revealed';
import Cover from './cover';

export default function Root (props) {
  let className = 'bulbs-video-root player';
  let { actions, data } = props;

  if (!data.video) {
    return <div className={className} />;
  }
  else if (data.controller.revealed) {
    return (
      <div className={className}>
        <Revealed data={data} actions={actions} />;
      </div>
    );
  }
  else {
    return (
      <div className={className}>
        <Cover data={data} actions={actions} />;
      </div>
    );
  }
}

Root.propTypes = {
  actions: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};
