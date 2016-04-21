'use strict'; // eslint-disable-line

const webpack = require('webpack');
const webpackBase = require('./webpack.base.js');
const plugins = webpackBase.plugins;
const loaders = webpackBase.loaders;
const config = Object.assign({}, webpackBase.config);

config.plugins = [
  plugins.chunker,
  plugins.styleExtractor,
  plugins.uglify,
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production'),
      'ONION_STUDIOS_URL': JSON.stringify('//www.onionstudios.com'),
    },
  }),
];

config.module.loaders = [
  loaders.babel,
  loaders.yaml,
  loaders.json,
  loaders.styleExtractor,
  loaders.cssExtractor,
  loaders.eslint,
  loaders.files,
];

config.module.preLoaders = [
  loaders.eslint,
];

config.eslint = {
  configFile: '.eslintrc',
};

module.exports = config;
