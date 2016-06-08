'use strict'; // eslint-disable-line

const karmaConfig = require('./karma.base.js');

karmaConfig.webpack = require('./webpack.config.coverage.js');

if (process.env.TRAVIS) {
  karmaConfig.captureTimeout = 0;
  karmaConfig.browsers = ['Chrome_travis_ci'];
}
else {
  karmaConfig.browsers = ['Chrome'];
}

if (process.env.TRAVIS) {
  karmaConfig.reporters.push('coverage');
  karmaConfig.reporters.push('coveralls');
  karmaConfig.coverageReporter = {
    type: 'lcov', dir: 'coverage/',
  };
}
else {
  karmaConfig.reporters.push('coverage');
  karmaConfig.coverageReporter = {
    type: 'html', dir: 'coverage/',
  };
}

module.exports = function (config) {
  // level of logging
  // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
  config.logLevel = config.LOG_WARN;
  config.set(karmaConfig);
};
