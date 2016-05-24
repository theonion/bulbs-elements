'use strict'; // eslint-disable-line

const webpackBase = require('./webpack.base.js');

const config = webpackBase.config;
const loaders = webpackBase.loaders;

module.exports = {
  devtool: 'inline-source-map',
  cache: true,
  resolve: config.resolve,
  debug: true,
  module: Object.assign({}, config.module, {
    loaders: [
      loaders.babel,
      loaders.yaml,
      loaders.json,
      loaders.sass,
      loaders.css,
      loaders.files,
    ],
  }),
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
};
