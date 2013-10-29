/**
 * Created with JetBrains PhpStorm.
 * User: jefflu
 * Date: 10/27/13
 * Time: 1:52 PM
 * To change this template use File | Settings | File Templates.
 */
/* global twc */
/*jshint -W065 */

'use strict';
var util = require('util');
var path = require('path');
var shell = require('shelljs');
var yeoman = require('yeoman-generator');

var Generator = module.exports = function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);

  this.author = shell.exec('git config --get user.name', { silent: true }).output.trim();
  this.timestamp = new Date();
  try {
    this.appname = require(path.join(process.cwd(), 'bower.json')).name;
  } catch (e) {
    this.appname = path.basename(process.cwd());
  }

  if (typeof this.env.options.appPath === 'undefined') {
    try {
      this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
    } catch (e) {}
    this.env.options.appPath = this.env.options.appPath || 'docroot/sites/all/modules/custom/angularmods/';
  }

  if (typeof this.env.options.testPath === 'undefined') {
    try {
      this.env.options.testPath = require(path.join(process.cwd(), 'bower.json')).testPath;
    } catch (e) {}
    this.env.options.testPath = this.env.options.testPath || 'site-testing/spec';
  }

  if (typeof this.env.options.minsafe === 'undefined') {
    this.option('minsafe');
    this.env.options.minsafe = this.options.minsafe;
  }

  var sourceRoot = '/templates/javascript';
  this.scriptSuffix = '.js';

  if (this.env.options.minsafe) {
    sourceRoot += '-min';
  }

  this.sourceRoot(path.join(__dirname, sourceRoot));
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.isRepo = function() {
  if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
  }
  if(shell.pwd().substr(-'/twc_cms'.length) !== '/twc_cms') {
    shell.echo('Your current directory is: ' + shell.pwd());
    shell.echo('Must be at the root of twc_cms to execute this command');
    shell.exit(1);
  }
};

Generator.prototype.isExist = function(type, path) {
  if(shell.test('-e', path)) {
    shell.echo(type + ' already exists: ' + path);
    shell.exit(1);
  }
};

Generator.prototype.appTemplate = function (src, dest) {
  yeoman.generators.Base.prototype.template.apply(this, [
    src,
    path.join(this.env.options.appPath, dest)
  ]);
};

Generator.prototype.testTemplate = function (src, dest) {
  yeoman.generators.Base.prototype.template.apply(this, [
    src,
    path.join(this.env.options.testPath, dest)
  ]);
};

Generator.prototype.htmlTemplate = function (src, dest) {
  yeoman.generators.Base.prototype.template.apply(this, [
    src,
    path.join(this.env.options.appPath, dest)
  ]);
};

Generator.prototype.generateSourceAndTest = function (appTemplate, testTemplate, targetDirectory) {
  this.appTemplate(appTemplate, path.join(targetDirectory, this.name));
  this.testTemplate(testTemplate, path.join(targetDirectory, this.name));
};

Generator.prototype.generateModuleFiles = function () {
  var targetDirectory = 'modules';
  this.appTemplate('app.js', path.join(targetDirectory, this.name, this.name+'.app.js'));
  this.appTemplate('controller.js', path.join(targetDirectory, this.name, this.name+'.controller.js'));
  this.appTemplate('module.css', path.join(targetDirectory, this.name, 'css', 'global_'+this.name+'.css'));
  this.appTemplate('module.sass', path.join(targetDirectory, this.name, 'sass', 'global_'+this.name+'.sass'));
  this.appTemplate('module.info', path.join(targetDirectory, this.name, this.name+'.info'));
  this.appTemplate('esi.inc', path.join(targetDirectory, this.name, this.name+'.esi.inc'));
  this.appTemplate('config.rb', path.join(targetDirectory, this.name, 'config.rb'));
  this.appTemplate('view.html', path.join(targetDirectory, this.name, 'templates', this.name+'.html'));
  this.appTemplate('tpl.php', path.join(targetDirectory, this.name, 'templates', this.name+'.tpl.php'));
  this.testTemplate('spec/controller.js', path.join(targetDirectory, this.name, this.name + '.spec.js'));
};
