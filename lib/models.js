
var fs = require('fs');

module.exports = function(duct) {

  var models = {};

  // preload the models

  fs.readdirSync(duct.paths.models).forEach(function(file) {
    if (file.charAt(0) !== '.' && file.match(/(_|.js)/gi)) {
      models[file.split('_')[0]] = require(duct.paths.models + file);
    }
  });

  return models;

};