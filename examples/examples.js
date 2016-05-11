/* eslint-disable no-unused-vars */
let context = require.context('../elements', true, /^\.\/[^\/]+\/.+\.js$/);
context.keys().forEach((key) => {
  let [_x, dir, file] = key.match(/\.\/(.+)\/(.+).js/) || [];// eslint-disable-line
  if (dir === file) {
    context(key);
  }
});

import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import './style.scss';
ReactDOM.render(Routes, document.getElementById('mount'));
