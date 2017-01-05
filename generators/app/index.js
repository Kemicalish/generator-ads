'use strict';
var Generator = require('yeoman-generator');
let _ = require('lodash');
let settings = {
  STATIC_SKIN_DIRNAME: 'staticskin',
  DESTINATION_DIRNAME: '.'
};
const mkdirp = require('mkdirp');

const formats = [
  ['staticskin', 'Static Skin'],
  ['gulp', 'gulp'],
  ['grunt', 'grunt  (soon)']
];

function toChoices(arr) {
  return arr.map(b => {
    return {name: b[1], value: b[0]};
  });
}

module.exports = Generator.extend({
  prompting: function () {
    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'The Project Name (ex: CLIENTGAME_LAUNCH)',
      store: true
    }, {
      type: 'input',
      name: 'websiteName',
      message: 'The Website Destination Name (ex: JVCOM)'
    }/*, {
      type: 'list',
      name: 'format',
      message: 'Choose your template',
      choices: toChoices(formats),
      default: 'webpack',
    }*/];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },
  writing: function () {
    this.fs.copy(
      this.templatePath(`${settings.STATIC_SKIN_DIRNAME}/commons/**/*`),
      this.destinationPath(settings.DESTINATION_DIRNAME),
      _.merge({}, settings, this.props)
    );

    this.fs.copy(
      this.templatePath(`${settings.STATIC_SKIN_DIRNAME}/custom/PROJECT_NAME_WEBSITE_NAME.jpg`),
      this.destinationPath(`${settings.DESTINATION_DIRNAME}/${this.props.projectName}_${this.props.websiteName}.jpg`),
      _.merge({}, settings, this.props)
    );

    this.fs.copy(
      this.templatePath(`${settings.STATIC_SKIN_DIRNAME}/custom/PSD/PROJECT_NAME_WEBSITE_NAME.psd`),
      this.destinationPath(`${settings.DESTINATION_DIRNAME}/PSD/${this.props.projectName}_${this.props.websiteName}.psd`),
      _.merge({}, settings, this.props)
    );
    mkdirp(this.destinationPath(`${settings.DESTINATION_DIRNAME}/FONT`), function (err) {

    });
  },

  install: function () {
    //this.installDependencies();
  }
});
