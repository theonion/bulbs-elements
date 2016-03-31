let context = require.context('../elements', true, /^\.\/[^\/]+\/[^\.]+(?!\.test)\.js$/);
context.keys().forEach((key) => {
  let [x, dir, file] = key.match(/\.\/(.+)\/(.+).js/) || [];
  if (dir === file) {
    context(key);
  }
});

import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import './style.scss';
ReactDOM.render(Routes, document.getElementById('mount'));
