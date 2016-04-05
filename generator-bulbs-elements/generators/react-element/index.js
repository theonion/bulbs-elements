'use strict';
var yeoman     = require('yeoman-generator');
var chalk      = require('chalk');
var onionsay   = require('onionsay');
var path       = require('path');
var inflection = require('inflection');
var common     = require('../../common');

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
    this.destinationRoot(path.join(__dirname, '../../elements', inflection.dasherize(this.props.name)));
  },

  writing: function () {
    var templateProps = {
      elementName: inflection.dasherize(this.props.name),
      elementPathName: inflection.dasherize(this.props.name),
      elementClassName: inflection.classify(this.props.name.replace('-', '_'), false)
    };
    common.copyDirectory(this, templateProps);
  },

  install: function () {
  }
});
