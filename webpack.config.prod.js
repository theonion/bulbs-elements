var webpack = require('webpack');
var webpackBase = require('./webpack.base.js');
var plugins = webpackBase.plugins;
var loaders = webpackBase.loaders;
var config = Object.assign({}, webpackBase.config);

config.plugins = [
  plugins.chunker,
  plugins.sassExtractor,
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
  loaders.sassExtractor,
  loaders.eslint,
];

config.module.preLoaders = [
  loaders.eslint,
];

config.eslint = {
  configFile: '.eslintrc'
};

module.exports = config;
