var webpack = require('webpack');
var path    = require('path');
var glob    = require('glob');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// postcss processors
var autoprefixer = require('autoprefixer');
var initial      = require('postcss-initial');
var stylelint    = require('stylelint');

var elementsDir = path.join(__dirname, '/elements');
var elementDirs = glob.sync(path.join(elementsDir, '/*/'));
var libDir = path.join(__dirname, '/lib');
var examplesDir = path.join(__dirname, '/examples');

var includeDirs = [
  elementsDir,
  libDir,
  examplesDir,
];

var entries = {};

elementDirs.forEach(function (dir) {
  var elementName = path.basename(dir);
  var elementEntryPoint = path.join(dir, elementName + '.js');
  entries['dist/' + elementName] = elementEntryPoint;
});

glob.sync(path.join(elementsDir, '*/*-cms.js')).forEach(function (cmsFile) {
  var elementName = path.basename(path.dirname(cmsFile));
  entries['dist/' + elementName + '.bulbs-cms'] = cmsFile;
});

// We will vendor common dependencies of our elements.
entries['dist/vendor'] = [
  'react',
  'react-dom',
  'classnames',
  'document-register-element',
  'document-register-element/build/innerHTML',
  'es6-promise',
  'isomorphic-fetch',
  'dom4',
  'camelcase',
  'object-map-to-array',
  './lib/bulbs-elements/register',
  './lib/bulbs-elements/store',
  './lib/bulbs-elements/bulbs-element',
  './lib/bulbs-elements/components/cropped-image',
];

var sassExtractor = new ExtractTextPlugin('[name].css');

exports.plugins = {
  chunker: new webpack.optimize.CommonsChunkPlugin('dist/vendor', 'dist/vendor.bundle.js'),
  sassExtractor: sassExtractor,
  uglify: new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
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
  sassExtractor: {
    test: /\.scss$/,
    loader: sassExtractor.extract(
      'style-loader',
      'css-loader!postcss-loader!sass-loader'
    ),
    include: includeDirs,
  },
  eslint: {
    test: /\.js$/,
    loader: 'eslint-loader',
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
      'node_modules',
      'lib',
    ],
    alias: {
    },
  },
  module: {
  },
  postcss: function () {
    return  [
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
