'use strict'; // eslint-disable-line

const karmaConfig = require('./karma.base.js');

karmaConfig.browserStack = {
  username: process.env.BROWSER_STACK_USERNAME,
  accessKey: process.env.BROWSER_STACK_ACCESS_KEY,
  captureTimeout: 300,
  timeout: 300,
  retryLimit: 5,
};

karmaConfig.customLaunchers = {
  bs_android_4_4: {
    base: 'BrowserStack',
    device: 'Samsung Galaxy S5',
    os: 'android',
    os_version: '4.4',
  },
  bs_android_5_0: {
    base: 'BrowserStack',
    device: 'Google Nexus 5',
    os: 'android',
    os_version: '5.0',
  },
  bs_android_4_3: {
    base: 'BrowserStack',
    device: 'Samsung Galaxy S4',
    os: 'android',
    os_version: '4.3',
  },
  bs_android_4_1: {
    base: 'BrowserStack',
    device: 'Samsung Galaxy S3',
    os: 'android',
    os_version: '4.1',
  },
  bs_android_4_0: {
    base: 'BrowserStack',
    device: 'Google Nexus',
    os: 'android',
    os_version: '4.0',
  },
  bs_ios_9_1: {
    base: 'BrowserStack',
    device: 'iPhone 6S Plus',
    os: 'ios',
    os_version: '9.1',
  },
  bs_ios_8_3: {
    base: 'BrowserStack',
    device: 'iPhone 6 Plus',
    os: 'ios',
    os_version: '8.3',
  },
  bs_ie_10: {
    base: 'BrowserStack',
    os: 'windows',
    os_version: '7',
    browser: 'ie',
    browser_version: '10.0',
  },
  bs_ie_11: {
    base: 'BrowserStack',
    os: 'windows',
    os_version: '8.1',
    browser: 'ie',
    browser_version: '11.0',
  },
  bs_safari_9: {
    base: 'BrowserStack',
    os: 'osx',
    os_version: 'elcapitan',
    browser: 'safari',
    browser_version: '9.1',
  },
  bs_chrome_50: {
    base: 'BrowserStack',
    os: 'osx',
    os_version: 'yosemite',
    browser: 'chrome',
    browser_version: '50',
  },
  bs_firefox_47: {
    base: 'BrowserStack',
    os: 'osx',
    os_version: 'yosemite',
    browser: 'firefox',
    browser_version: '47',
  },
};

karmaConfig.browserNoActivityTimeout = 100000;

karmaConfig.browsers = Object.keys(karmaConfig.customLaunchers);
karmaConfig.browsers = [process.env.BROWSER || 'bs_chrome_47'];
module.exports = function (config) {
  // level of logging
  // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
  config.logLevel = config.LOG_WARN;
  config.set(karmaConfig);
};
