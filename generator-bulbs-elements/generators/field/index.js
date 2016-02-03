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
      'Generate a ' + chalk.green('bulbs-element state field')
    ));

    var prompts = [{
      type: 'input',
      name: 'elementName',
      message: 'What element is this field for? eg: bulbs-poll.',
      required: true
    }, {
      type: 'input',
      name: 'fieldName',
      message: 'What is the name of this field? eg: `selectedWidget`',
      required: true,
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  paths: function () {
    this.destinationRoot(path.join(__dirname, '../../../elements', this.props.elementName, 'fields'));
  },

  writing: function () {
    var templateProps = {
      fieldName: inflection.classify(this.porps.fieldName),
      fieldPathName: inflection.dasherize(this.props.fieldName),
      fieldClassName: inflection.classify(this.props.fieldName, false),
      elementName: this.props.elementName,
    };
    common.copyDirectory(this, templateProps);
  },

  install: function () {
    console.log(chalk.green('Be sure to add your field to the element store at.'));
  }
});
