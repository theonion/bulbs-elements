'use strict'; // eslint-disable-line

const webpackBase = require('./webpack.base.js');
const webpackConfig = require('./webpack.config.karma.js');

const loaders = webpackBase.loaders;

webpackConfig.module.preLoaders = [
  loaders.tests,
  loaders.istanbul,
];

module.exports = webpackConfig;
