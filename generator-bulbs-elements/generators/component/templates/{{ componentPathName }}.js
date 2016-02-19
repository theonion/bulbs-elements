import React, { PropTypes } from 'react';
import classnames from 'classnames';

export default function <%= componentName %> (props) {
  let className = classnames('<%= componentCssClassName %>', {});

  return (
    <div className={className}>
    </div>
  );
};

<%= componentName %>.propTypes = {

};
