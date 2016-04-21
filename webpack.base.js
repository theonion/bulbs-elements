'use strict'; // eslint-disable-line

let webpack = require('webpack');
let path = require('path');
let glob = require('glob');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');

// postcss processors
let autoprefixer = require('autoprefixer');
let initial = require('postcss-initial');
//let stylelint = require('stylelint');

let elementsDir = path.join(__dirname, '/elements');
let elementDirs = glob.sync(path.join(elementsDir, '/*/'));
let libDir = path.join(__dirname, '/lib');
let examplesDir = path.join(__dirname, '/examples');
let testDir = path.join(__dirname, '/test');
let bowerDir = path.join(__dirname, '/bower_components');

let includeDirs = [
  elementsDir,
  libDir,
  examplesDir,
  testDir,
  bowerDir,
];

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

let styleExtractor = new ExtractTextPlugin('[name].css');

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
    include: includeDirs,
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
