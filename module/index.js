'use strict';
var util = require('util');
var path = require('path');
var twcBase = require('../twc-base.js');


var Generator = module.exports = function Generator() {
  twcBase.apply(this, arguments);

  // if the controller name is suffixed with ctrl, remove the suffix
  // if the controller name is just "ctrl," don't append/remove "ctrl"
  if (this.name && this.name.toLowerCase() !== 'ctrl' && this.name.substr(-4).toLowerCase() === 'ctrl') {
    this.name = this.name.slice(0, -4);
  }
  this.modulePath = 'docroot/sites/all/modules/custom/angularmods/modules/' + this.name;
  this.moduleTestPath = 'site-testing/spec/modules' + this.name;
  this.mkdir(this.modulePath);
  this.mkdir(path.join(this.modulePath, 'templates'));
  this.mkdir(this.moduleTestPath);

};

util.inherits(Generator, twcBase);

Generator.prototype.createModuleFiles = function createModuleFiles() {
  this.generateModuleFiles();
};
