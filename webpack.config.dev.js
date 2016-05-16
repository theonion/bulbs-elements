'use strict'; // eslint-disable-line

const webpack = require('webpack');
const webpackBase = require('./webpack.base.js');
const plugins = webpackBase.plugins;
const loaders = webpackBase.loaders;
const config = Object.assign({}, webpackBase.config);

config.plugins = [
  plugins.chunker,
  plugins.styleExtractor,
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('development'),
    },
  }),
];

config.module.loaders = [
  loaders.babel,
  loaders.yaml,
  loaders.json,
  loaders.styleExtractor,
  loaders.cssExtractor,
  loaders.files,
];

config.module.preLoaders = [
  // FIXME: eslint is throwing sytax errors on ES6 features
  //loaders.eslint,
];

config.eslint = {
  configFile: '.eslintrc',
};

module.exports = config;
