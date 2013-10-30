
var fs = require('fs');

module.exports = function(duct) {

  var controllers = {};

  // preload controllers
  fs.readdirSync(duct.paths.controllers).forEach(function(file) {
    if (file.charAt(0) !== '.' && file.match(/(_|.js)/gi)) {
      controllers[file.split('_')[0]] = require(duct.paths.controllers + '/' + file)(duct);
    }
  });

  return controllers;

};