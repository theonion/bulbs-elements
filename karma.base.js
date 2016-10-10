'use strict'; // eslint-disable-line

const path = require('path');

module.exports = {
  // base path that will be used to resolve all patterns (eg. files, exclude)
  basePath: '',

  // frameworks to use
  // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
  frameworks: [
    'mocha',
    'sinon-chai',
    'fixture',
    'bower',
  ],

  // list of files / patterns to load in the browser
  files: [
    // test/index.js loads all our tests
    // and sets up test helpers (chai-enzyme, etc.)
    path.join(__dirname, 'node_modules', 'whatwg-fetch', 'fetch.js'),
    path.join(__dirname, 'test', 'index.js'),
    path.join(__dirname, 'test', 'fixtures', '**', '*'),
  ],

  // list of files to exclude
  exclude: [],

  // preprocess matching files before serving them to the browser
  // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
  preprocessors: {
    'elements/**/*.js': ['webpack', 'sourcemap'],
    'lib/**/*.js': ['webpack', 'sourcemap'],
    'test/**/*.js': ['webpack', 'sourcemap'],
    '**/*.html': ['html2js'],
  },

  webpack: require('./webpack.config.karma'),

  webpackMiddleware: {
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      modules: false,
      reasons: true,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: true,
      publicPath: false
    },
  },

  bowerPackages: [
    'jquery',
    'flexslider', // jQuery plugin for bulbs-slideshow
  ],

  // test results reporter to use
  // possible values: 'dots', 'progress'
  // available reporters: https://npmjs.org/browse/keyword/karma-reporter
  reporters: ['spec'],

  specReporter: {
    maxLogLines: 5,         // limit number of lines logged per test
    suppressFailed: false,  // do not print information about failed tests
    suppressPassed: true,  // do not print information about passed tests
    suppressSkipped: false,  // do not print information about skipped tests
    showSpecTiming: false // print the time elapsed for each spec
  },

  client: {
    mocha: {
      reporter: 'html',
      ui: 'bdd',
      timeout: 6000,
    },
    chai: {
      includeStack: true,
    },
  },

  plugins: [
    'karma-bower',
    'karma-browserstack-launcher',
    'karma-chai',
    'karma-chrome-launcher',
    'karma-coveralls',
    'karma-phantomjs-launcher',
    'karma-coverage',
    'karma-coveralls',
    'karma-fixture',
    'karma-html2js-preprocessor',
    'karma-mocha',
    'karma-sinon',
    'karma-sinon-chai',
    'karma-sourcemap-loader',
    'karma-spec-reporter',
    'karma-webpack',
  ],

  // web server port
  port: 9876,

  // enable / disable colors in the output (reporters and logs)
  colors: true,

  // enable / disable watching file and executing tests whenever any file changes
  autoWatch: true,

  // start these browsers
  // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
  browsers: ['Chrome'],

  customLaunchers: {
    Chrome_travis_ci: {
      base: 'Chrome',
      flags: ['--no-sandbox'],
    },
  },
  // Continuous Integration mode
  // if true, Karma captures browsers, runs the tests and exits
  singleRun: false,
};
