'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const _ = require('lodash');

const testPrompt = {
  projectName: 'PROJECT',
  websiteName: 'WEBSITE'
};

let settings = require('../generators/conf.js');

describe('generator-ads:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts(testPrompt)
      .toPromise();
  });

  _.each([
    path.join(settings.DESTINATION_DIRNAME, 'DEMO', 'demo.html'),
    path.join(settings.DESTINATION_DIRNAME, 'DEMO', 'static_skin_demo.jpg'),
    path.join(settings.DESTINATION_DIRNAME, 'background_color.txt'),
    path.join(settings.DESTINATION_DIRNAME, 'PSD', `${testPrompt.projectName}_${testPrompt.websiteName}.psd`),
    path.join(settings.DESTINATION_DIRNAME, `${testPrompt.projectName}_${testPrompt.websiteName}.jpg`)
  ], file => {
    it('creates ' + file, function () {
      assert.file([
        file
      ]);
    });
  });

});
