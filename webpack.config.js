var webpack = require('webpack');
var path    = require('path');
var glob    = require('glob');

// postcss processors
var autoprefixer = require('autoprefixer');
var initial      = require('postcss-initial');
var stylelint    = require('stylelint');

var elementsDir = path.join(__dirname, '/elements');
var elementDirs = glob.sync(path.join(elementsDir, '/*/'));
var libDir = path.join(__dirname, '/lib');

var includeDirs = [
  elementsDir,
  libDir,
];

var entries = {};

elementDirs.forEach(function (dir) {
  var elementName = path.basename(dir);
  var elementEntryPoint = path.join(dir, elementName + '.js');
  entries['dist/' + elementName] = elementEntryPoint;
});

var testFiles = glob.sync('{elements,lib}/**/*.test.js');
testFiles.forEach(function (file) {
  entries['.test/'+file.replace(/\.js$/, '')] = path.join(__dirname, file);
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

module.exports = {
  devtool: 'source-map',
  entry: entries,
  output: {
    path: path.join(__dirname),
    filename: '[name].js',
  },
  plugins: [
    //new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin("dist/vendor", "dist/vendor.bundle.js"),
  ],
  resolve: {
    modulesDirectories: [
      'node_modules',
      'lib',
    ],
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint-loader',
      include: includeDirs,
    }],
    loaders: [{
      test: /\.scss$/,
      loaders: [
        'style',
        'css',
        'postcss-loader',
        'sass'
      ],
      include: includeDirs,
    },{
      test: /\.(js)$/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015'],
      },
      include: includeDirs,
    },{
      test: /\.yaml/,
      loaders: ['json', 'yaml'],
      include: includeDirs,
    },{
      test: /\.json/,
      loaders: ['json'],
      include: includeDirs,
    }]
  },
  postcss: function () {
    return  [
      stylelint({
        'extends': 'stylelint-config-standard'
      }),
      autoprefixer,
      initial,
    ];
  },
  eslint: {
    configFile: 'eslintrc'
  }
};
