/* eslint-disable no-sync */
'use strict'; // eslint-disable-line

const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// postcss processors
const autoprefixer = require('autoprefixer');
const initial = require('postcss-initial');
//const stylelint = require('stylelint');

const elementsDir = path.join(__dirname, 'elements');
const elementDirs = glob.sync(path.join(elementsDir, '/*/'));
const libDir = path.join(__dirname, 'lib');
const examplesDir = path.join(__dirname, 'examples');
const testDir = path.join(__dirname, 'test');
const bowerDir = path.join(__dirname, 'bower_components');

const includeDirs = [
  elementsDir,
  libDir,
  examplesDir,
  testDir,
  bowerDir,
];

const styleExtractor = new ExtractTextPlugin('[name].css');

let entries = {};

elementDirs.forEach(function (dir) {
  let elementName = path.basename(dir);
  let elementEntryPoint = path.join(dir, elementName + '.js');
  entries['dist/' + elementName] = elementEntryPoint;
});

glob.sync(path.join(elementsDir, '*/*-cms.js')).forEach(function (cmsFile) {
  let elementName = path.basename(path.dirname(cmsFile));
  entries['dist/' + elementName + '.bulbs-cms'] = cmsFile;
});

exports.plugins = {
  chunker: new webpack.optimize.CommonsChunkPlugin({
    name: 'dist/vendor.bundle',
  }),
  styleExtractor: styleExtractor, // eslint-disable-line
  uglify: new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
  clean: new CleanWebpackPlugin(['.test', 'dist'], {
    verbose: true,
  }),
};

exports.loaders = {
  babel: {
    test: /\.js$/,
    loader: 'babel',
    include: [
      elementsDir,
      libDir,
      examplesDir,
      testDir,
    ],
  },
  yaml: {
    test: /\.yaml$/,
    loaders: ['json', 'yaml'],
    include: includeDirs,
  },
  json: {
    test: /\.json$/,
    loaders: ['json'],
    include: includeDirs,
  },
  sass: {
    test: /\.scss$/,
    loaders: [
      'style',
      'css',
      'postcss',
      'sass',
    ],
    include: includeDirs,
  },
  css: {
    test: /\.css$/,
    loaders: [
      'style',
      'css',
    ],
    include: includeDirs,
  },
  styleExtractor: {
    test: /\.scss$/,
    loader: styleExtractor.extract(
      'style-loader',
      'css-loader!postcss-loader!sass-loader'
    ),
    include: includeDirs,
  },
  cssExtractor: {
    test: /\.css$/,
    loader: styleExtractor.extract(
      'style-loader',
      'css-loader'
    ),
    include: includeDirs,
  },
  eslint: {
    test: /\.js$/,
    loader: 'eslint-loader',
    include: includeDirs,
  },
  files: {
    test: /\.(ttf|eot|svg|woff)$/,
    loader: 'file',
    include: includeDirs,
  },
};

exports.config = {
  entry: entries,
  output: {
    path: path.join(__dirname),
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
  ],
  resolve: {
    modulesDirectories: [
      'bower_components',
      'node_modules',
      'lib',
    ],
    alias: {
    },
  },
  module: {
  },
  postcss () {
    return [
      //stylelint({
      //  'extends': 'stylelint-config-standard'
      //}),
      initial({
        reset: 'all',
        replace: true,
      }),
      autoprefixer,
    ];
  },
};
