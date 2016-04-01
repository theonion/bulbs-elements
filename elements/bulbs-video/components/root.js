import React, { PropTypes } from 'react';
import classnames from 'classnames';

import Revealed from './revealed';
import Cover from './cover';

export default function Root (props) {
  let className = classnames('bulbs-video-root', {});
  let { actions, data } = props;
  if (!(data.video && data.sources)) {
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
    )
  }
}

Root.propTypes = {

};
