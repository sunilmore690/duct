/**
  * Initializes a Duct app
  *
  * Ex:
  * duct new AppName
  *
  */
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
  /**
    * Chief command for generating a new app
    */
  generate: function() {
    if( fs.existsSync( this.appPath ) ){
      console.log('a folder by ' + this.name + ' already exists');
    }else {
      console.log('A new duct app is being generated ..');
      this.readFromFolderAndWrite( this.appPath, this.templatesPath() );
    };
  },

  /**
    * A recursive function which would check if the contents of the folder recurringly and
    * creates a folder if its a folder and file if a file.
    */
  readFromFolderAndWrite: function( folderPath, templatesPath ) {
    var templatePath, template, filePath, _this, compiledHBStemplate, templateContent;
    _this = this;

    this.createFolder( folderPath ); // create folder if doesn't exist
    
    fs.readdir( templatesPath , function( err, files ) { // read the dir

      files.forEach(function( file ) { // loop through the files
        var st = fs.lstatSync( templatesPath + '/' + file );
        if (st.isDirectory()) { // check if its a directory
          _this.readFromFolderAndWrite( folderPath + '/' + file, templatesPath + '/' + file );  // make this recursive
        } else{
          // read and compile !
          templateContent = fs.readFileSync( templatesPath + '/' + file, 'utf8' );
          compiledHBStemplate = hbs.compile( templateContent );
          fs.writeFileSync( folderPath + '/' + file, compiledHBStemplate(), 'utf8' );
        };
      });
    });

  },

  /**
    * Create the folder if it doesn't exist
    * Wanted it async.
    */
  createFolder: function( folderPath ) {
    if (fs.existsSync( folderPath )) {
      return false;
    } else{
      fs.mkdirSync( folderPath );
      return true;
    };
  },

  /**
    * TODO: DRY this function
    * Get templates path
    */
  templatesPath: function() {
    templateName = 'newDuctApp';
    return path.resolve( __dirname, '../..', 'templates/' + templateName );
  }
};
