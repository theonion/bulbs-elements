/**
 * Utility for updating the table of contents in README.md
 */

'use strict';

var fs = require('fs');
var toc = require('markdown-toc');

var ConsoleHelper = require('./console-helper');

var MD_PATH = process.argv[2] || 'README.md';

fs.readFile(MD_PATH, 'utf-8', function (error, data) {
  if (error) {
    ConsoleHelper.exitWithError(error);
  }

  var withToc = toc.insert(data, {
    regex: /(?:<!-- markdown-toc(?:\s*-stop)? -->)/g,
    open: '<!-- markdown-toc -->\n\n',
    close: '<!-- markdown-toc-stop -->'
  });

  fs.writeFile(MD_PATH, withToc, function () {
    console.log('Table of contents updated in ' + MD_PATH);
  });
});
