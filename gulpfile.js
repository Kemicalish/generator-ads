'use strict';
const gulp = require('gulp');
const excludeGitignore = require('gulp-exclude-gitignore');
const mocha = require('gulp-mocha');
const plumber = require('gulp-plumber');


gulp.task('nsp', function () {

});

gulp.task('pre-test', function () {
  return gulp.src('generators/**/*.js')
    .pipe(excludeGitignore());
});

gulp.task('test', ['pre-test'], function (cb) {
  let mochaErr;

  gulp.src('test/**/*.js')
    .pipe(plumber())
    .pipe(mocha({reportesr: 'spec'}))
    .on('error', function (err) {
      mochaErr = err;
    })
    .on('end', function () {
      cb(mochaErr);
    });
});

gulp.task('watch', function () {
  gulp.watch(['generators/**/*.js', 'test/**'], ['test']);
});

gulp.task('prepublish', ['nsp']);
gulp.task('default', ['test']);
