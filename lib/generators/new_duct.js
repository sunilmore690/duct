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
  this.appPath = root + '/' +  this.name;
};

NewDuctApp.prototype = {

  generate: function() {

    var templatePath, template, filePath, _this;

    _this = this;

    if( fs.existsSync( this.appPath ) ){
      console.log('a folder by ' + this.name + ' already exists');
    }else {
      console.log('A new duct app is being generated ..');

      // Generate the app folder
      fs.mkdirSync( this.appPath );
      templatePath = this.templatesPath();

      fs.readdir( templatePath , function( err, files ) {

        files.forEach(function( file ) {
          console.log(file);
          fs.lstat( file, function( stats ) {

            // stats.isDirectory();  This is not working. There is something very seriouly wrong with my code that i am not getting. TODO

            if ( stats.isDirectory() ) {
              // Make a recurisve function
            } else{
              // compile and go.
            };
          });
        });
      });
    };
  },

  templatesPath: function() {
    templateName = 'newDuctApp';
    return path.resolve( __dirname, '../..', 'templates/' + templateName );
  }
};