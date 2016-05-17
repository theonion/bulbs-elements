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

module.exports = config;
