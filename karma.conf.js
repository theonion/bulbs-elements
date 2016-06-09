'use strict'; // eslint-disable-line

const karmaConfig = require('./karma.base.js');

module.exports = function (config) {
  // level of logging
  // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
  config.logLevel = config.LOG_DISABLE;
  config.set(karmaConfig);
};
