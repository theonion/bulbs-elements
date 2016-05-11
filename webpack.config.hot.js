const webpack = require('webpack');
const webpackBase = require('./webpack.base.js');
const plugins = webpackBase.plugins;
const loaders = webpackBase.loaders;
const config = Object.assign({}, webpackBase.config);

config.entry.examples = [
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
  loaders.css,
  loaders.files,
];

config.output.publicPath = '/';
module.exports = config;
