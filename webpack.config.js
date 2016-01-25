var webpack = require('webpack');
var path    = require('path');
var glob    = require('glob');

// postcss processors
var autoprefixer = require('autoprefixer');
var initial      = require('postcss-initial');
var stylelint    = require('stylelint');

/*
  Builds webpack entry configuration based on directories
  found in the `/elements` directory.

  We expect to find the following structure:

  * `elements/element-a/element-a.js`
  * `elements/element-a/element-a.test.js`

  * `elements/element-b/element-b.js`
  * `elements/element-b/element-b.test.js`


  This means that there are two elements

  * <element-a>
  * <element-b>

  This will return the following configuration:

  ```js
  {
    'dist/element-a': 'elements/element-a/element-a.js',
    'test/element-a': 'elements/element-a/test/element-a.js',
    'dist/element-b': 'elements/element-b/element-b.js',
    'test/element-b': 'elements/element-b/test/element-b.js',
  }
  ```

  This configuration interacts with our webpack setting for `output'
  and results in built elements in the dist and test folder:

  * `dist/element-a.js`
  * `dist/element-b.js`

  * `test/element-a.js`
  * `test/element-b.js`
*/
var elementsDir = path.join(__dirname, '/elements');
var elementDirs = glob.sync(path.join(elementsDir, '/*/'));

var entries = {};

elementDirs.forEach(function (dir) {
  var elementName = path.basename(dir);
  var elementEntryPoint = path.join(dir, elementName + '.js');
  var testEntryPoint = path.join(dir, elementName + '.test.js');
  entries['dist/' + elementName] = elementEntryPoint;
  entries['test/' + elementName] = testEntryPoint;
});

// We will vendor common dependencies of our elements.
entries['dist/vendor'] = [
  'react',
  'react-dom',
  'classnames',
  'document-register-element',
  'document-register-element/build/innerHTML',
  'dom4',
  'camelcase',
  'object-map-to-array',
  './elements/core',
];

module.exports = {
  entry: entries,
  output: {
      path: path.join(__dirname),
      filename: '[name].js',
  },
  plugins: [
    //new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin("dist/vendor", "dist/vendor.bundle.js"),
  ],
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint-loader',
      include: elementsDir,

    }],
    loaders: [{
      test: /\.scss$/,
      loaders: [
        'style',
        'css',
        'postcss-loader',
        'sass'
      ],
      include: elementsDir,
    },{
      test: /\.js/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015'],
      },
      include: elementsDir,
    },{
      test: /\.yaml/,
      loaders: ['json', 'yaml'],
      include: elementsDir,
    },{
      test: /\.json/,
      loaders: ['json'],
      include: elementsDir,
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
