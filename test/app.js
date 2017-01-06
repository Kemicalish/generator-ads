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

const backgroundTextFile = path.join(settings.DESTINATION_DIRNAME, 'background_color.txt');

const expectedFiles = [
  path.join(settings.DESTINATION_DIRNAME, 'DEMO', 'demo.html'),
  path.join(settings.DESTINATION_DIRNAME, 'DEMO', 'static_skin_demo.jpg'),
  backgroundTextFile,
  path.join(settings.DESTINATION_DIRNAME, 'PSD', `${testPrompt.projectName}_${testPrompt.websiteName}.psd`),
  path.join(settings.DESTINATION_DIRNAME, `${testPrompt.projectName}_${testPrompt.websiteName}.jpg`)
];

describe('generator-ads:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts(testPrompt)
      .toPromise();
  });

  _.each(expectedFiles, file => {
    it('creates ' + file, function () {
      assert.file([
        file
      ]);
    });
  });

  it(`${backgroundTextFile} should contain a default color in hex`, () => {
      assert.fileContent(backgroundTextFile, /#[0-9a-fA-F]+/);
  });

});
