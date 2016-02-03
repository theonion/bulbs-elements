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
      'Generate a ' + chalk.green('bulbs-element sub component')
    ));

    var prompts = [{
      type: 'input',
      name: 'elementName',
      message: 'What element is this field for? eg: bulbs-poll.',
      required: true
    }, {
      type: 'input',
      name: 'componentName',
      message: 'What is the name of this field? eg: `PollResults`',
      required: true,
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  paths: function () {
    this.destinationRoot(path.join(__dirname, '../../../elements', this.props.elementName, 'components'));
  },

  writing: function () {
    var dashedName = inflection.dasherize(inflection.underscore(this.props.componentName));
    var templateProps = {
			elementName: this.props.elementName,
      componentName: inflection.camelize(this.props.componentName, false),
      componentPathName: dashedName,
      componentClassName: inflection.camelize(this.props.componentName, false),
			componentCssClassName: this.props.elementName + '-' + dashedName,
    };
    common.copyDirectory(this, templateProps);
  },

  install: function () {
  }
});
