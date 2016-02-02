'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var onionsay = require('onionsay');
var walk     = require('walk');
var path     = require('path');
var inflect  = require('inflection');
var mustache = require('mustache');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    this.log(onionsay(
      'Generate a ' + chalk.green('bulbs-elements') + ' and sharpen the knife.'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'What is the name of this element? eg: bulbs-poll. This will become the tag name: <bulbs-poll />',
      required: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  paths: function () {
    this.destinationRoot(path.join(__dirname, 'elements', this.props.name));
  },

  writing: function () {
    var templateProps = {
    };
    var templatePath;
    var destinationPath;

    walk.walkSync(this.sourceRoot(), {
      listeners: {
        file: function (root, stats, next) {
          templatePath = path.relative(this.sourceRoot(), path.join(root, stats.name));
          destinationPath = mustache.render(this.destinationPath(templatePath), templateProps);
          this.fs.copyTpl(
            this.templatePath(templatePath),
            destinationPath,
            templateProps
          );
          next();
        }.bind(this)
      }
    });
  },

  install: function () {
  }
});
