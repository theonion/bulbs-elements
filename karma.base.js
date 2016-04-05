var path = require('path');
var webpackConfig = require('./webpack.config.hot');

module.exports = {
  // base path that will be used to resolve all patterns (eg. files, exclude)
  basePath: '',

  // frameworks to use
  // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
  frameworks: [
    'chai-spies',
    'chai',
    'mocha',
    'fixture',
  ],

  // list of files / patterns to load in the browser
  files: [
    path.join(__dirname, 'test/load-all-tests.js'),
  ],

  // list of files to exclude
  exclude: [
  ],

  // preprocess matching files before serving them to the browser
  // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
  preprocessors: {
    'elements/**/*.js': ['webpack', 'sourcemap'],
    'lib/**/*.js': ['webpack', 'sourcemap'],
    'test/**/*.js': ['webpack', 'sourcemap'],
    '**/*.html': ['html2js'],
  },

  webpack: {
    devtool: 'inline-source-map',
    resolve: webpackConfig.resolve,
    module: webpackConfig.module,
  },

  webpackMiddleware: {
    stats: {
      colors: true,
    },
  },

  // test results reporter to use
  // possible values: 'dots', 'progress'
  // available reporters: https://npmjs.org/browse/keyword/karma-reporter
  reporters: ['html', 'progress'],

  client: {
    mocha: {
      reporter: 'html',
      ui: 'bdd',
    },
  },

  // web server port
  port: 9876,

  // enable / disable colors in the output (reporters and logs)
  colors: true,

  // enable / disable watching file and executing tests whenever any file changes
  autoWatch: true,

  // start these browsers
  // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
  browsers: ['Chrome'],

  // Continuous Integration mode
  // if true, Karma captures browsers, runs the tests and exits
  singleRun: false,
};
