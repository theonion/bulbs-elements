import React from 'react';
import { registerReactElement } from 'bulbs-elements/register';
import { loadOnDemand } from 'bulbs-elements/util';

registerReactElement(
  'lazy-iframe',
  loadOnDemand((props) => (
    <iframe
      {...props}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  ))
);
