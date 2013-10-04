module.exports = NewDuctApp;

var fs = require('fs'),
  util = require('util'),
     _ = require('lodash'),
  root = process.cwd(),
  path = require('path'),
  inflect = require('inflect'),
  hbs = require('handlebars');

function NewDuctApp ( name ) {
  this.name = name;
};

NewDuctApp.prototype = {
  generate: function() {}
};
