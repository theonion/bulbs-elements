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
      'ONION_STUDIOS_URL': JSON.stringify('//videohub.local'),
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
  loaders.eslint,
];

config.eslint = {
  configFile: '.eslintrc',
};

module.exports = config;
