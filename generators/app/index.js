'use strict';
const path = require('path');
const Generator = require('yeoman-generator');
let _ = require('lodash');
let settings = require('../conf.js');
const mkdirp = require('mkdirp');

const formats = [
  ['staticskin', 'Static Skin'],
  ['preroll', 'Preroll (soon)']
];

function toChoices(arr) {
  return arr.map(b => {
    return {name: b[1], value: b[0]};
  });
}

function staticSkin(gen){
  gen.fs.copy(
      gen.templatePath(`${settings.STATIC_SKIN_DIRNAME}/commons/**/*`),
      gen.destinationPath(settings.DESTINATION_DIRNAME),
      _.merge({}, settings, gen.props)
    );

    gen.fs.copy(
      gen.templatePath(path.join(
        settings.STATIC_SKIN_DIRNAME,
        'custom',
        'PROJECT_NAME_WEBSITE_NAME.jpg')),
      gen.destinationPath(path.join(
        settings.DESTINATION_DIRNAME,
        `${gen.props.projectName}_${gen.props.websiteName}.jpg`)),
      _.merge({}, settings, gen.props)
    );

    gen.fs.copy(
      gen.templatePath(path.join(settings.STATIC_SKIN_DIRNAME,
        'custom',
        'PSD',
        'PROJECT_NAME_WEBSITE_NAME.psd')),
      gen.destinationPath(path.join(
          settings.DESTINATION_DIRNAME,
          'PSD',
          `${gen.props.projectName}_${gen.props.websiteName}.psd`
        )),
      _.merge({}, settings, gen.props)
    );
    mkdirp(gen.destinationPath(`${settings.DESTINATION_DIRNAME}/FONT`));
}

module.exports = Generator.extend({
  prompting: function () {
    const prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'The Project Name (ex: CLIENTGAME_LAUNCH)',
      store: true
    }, {
      type: 'input',
      name: 'websiteName',
      message: 'The Website Destination Name (ex: JVCOM)'
    }, {
      type: 'list',
      name: 'format',
      message: 'Choose your template',
      choices: toChoices(formats),
      default: 'staticskin'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },
  writing: function () {
    switch(this.props.format) {
      case 'staticskin': staticSkin(this); break;
      case 'preroll': break;
      default:break;
    }
  },

  install: function () {
    //this.installDependencies();
  }
});
