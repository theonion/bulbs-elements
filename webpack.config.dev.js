var glob = require('glob');
var path = require('path');
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
      'NODE_ENV': JSON.stringify('development'),
    },
  }),
];

config.module.loaders = [
  loaders.babel,
  loaders.yaml,
  loaders.json,
  loaders.sassExtractor,
];

config.module.preLoaders = [
  loaders.eslint,
];

config.eslint = {
  configFile: '.eslintrc'
};

var testFiles = glob.sync('{elements,lib}/**/*.test.js');
testFiles.forEach(function (file) {
  config.entry['.test/'+file.replace(/\.js$/, '')] = path.join(__dirname, file);
});


module.exports = config;
