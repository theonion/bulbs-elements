var webpack = require('webpack');
var webpackBase = require('./webpack.base.js');
var plugins = webpackBase.plugins;
var loaders = webpackBase.loaders;
var config = Object.assign({}, webpackBase.config);

config.entry['examples'] = [
  './examples/examples.js',
  'react-router',
];

config.plugins = [
  plugins.chunker,
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('hot'),
    },
  }),
];

config.module.loaders = [
  loaders.babel,
  loaders.yaml,
  loaders.json,
  loaders.sass,
];

module.exports = config;
