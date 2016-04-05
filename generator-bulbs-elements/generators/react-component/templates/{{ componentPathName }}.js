import React, { PropTypes } from 'react';

export default function <%= componentName %> (props) {
  let className = classnames('<%= componentCssClassName %>', {});

  return (
    <div className='<%= componentCssClassName %>'>
    </div>
  );
}

<%= componentName %>.propTypes = {

};
