import React, { PropTypes } from 'react';

import Revealed from './revealed';
import Cover from './cover';

export default function Root (props) {
  let className = 'bulbs-video-root player';
  let {
    actions, video, controller,
    autoplayNext
  } = props;

  if (!video) {
    return <div className={className} />;
  }
  else if (controller.revealed) {
    return (
      <div className={className}>
        <Revealed
          autoplayNext={autoplayNext}
          video={video}
          actions={actions}
        />
      </div>
    );
  }
  else {
    return (
      <div className={className}>
        <Cover video={video} actions={actions}/>
      </div>
    );
  }
}

Root.propTypes = {
  actions: PropTypes.object.isRequired,
  controller: PropTypes.object.isRequired,
  video: PropTypes.object,
};
