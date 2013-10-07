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

    var templatePath, template, filePath, _this, compiledHBStemplate, templateContent;

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
          var st = fs.lstatSync( _this.templatesPath() + '/' + file );
          if (st.isDirectory()) {
            // make this recursive
          } else{
            // read and compile !
            templateContent = fs.readFileSync( _this.templatesPath() + '/' + file, 'utf8' );
            compiledHBStemplate = hbs.compile( templateContent );
            fs.writeFileSync( process.cwd() + '/' + _this.name + '/' + file, compiledHBStemplate(), 'utf8' );
          };
        });
      });
    };
  },

  templatesPath: function() {
    templateName = 'newDuctApp';
    return path.resolve( __dirname, '../..', 'templates/' + templateName );
  }
};