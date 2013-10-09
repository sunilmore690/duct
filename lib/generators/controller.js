module.exports = BaseGenerator;

var fs = require('fs'),
  util = require('util'),
     _ = require('lodash'),
  root = process.cwd(),
  path = require('path'),
  inflect = require('inflect'),
  hbs = require('handlebars');

function BaseGenerator (name, type) {
  this.name = name;
  this.type = type;
  this.folderName = inflect.pluralize( type );
  this.extension = '_' + type + '.js';
  this.pluralizedName = inflect.pluralize( name );
};

BaseGenerator.prototype = {

  generate: function() {
    var _this = this;
    console.log('Generating a ' + this.type + ' from the command line');

    /**
      * TODO: Revise this flow
      *
      * Read the templates
      * NEEDS WORK !!
      */
    var readFileTemplate = fs.readFileSync( this.getTemplatesPath() , 'utf8' );
    
    /**
      * Compile and parse Template with Handlebars
      */
    var compiledHBStemplate = hbs.compile( readFileTemplate );

    /**
      * Create the api/ folder and then the /api/controllers/ or /api/models/ folder 
      */
    if ( !fs.existsSync( this.apiPath() ) ) {
      fs.mkdirSync( this.apiPath() );
      this.createFolder();
    }else {
      this.createFolder();
    }

    if ( fs.existsSync( this.fileDestination() ) ) {
      console.log( _this.fileForm() + '_' + _this.type +' already exists');
    } else{

      /**
        * Write to the file, this will also create the file
        */
      fs.writeFile( this.fileDestination() , compiledHBStemplate( { name: this.fileForm() } ), 'utf8', function(err) {
        if (err) throw err;
        console.log( _this.fileForm() + '_'+ _this.type +' file created.');
      });
    };
  },

  /**
    * Resolves and gives you the path for the template to read
    * Controller_template, Model_template and so on
    */
  getTemplatesPath: function () {
    templateName = this.type + '_template.js';
    return path.resolve( __dirname, '../..', 'templates/' + templateName );
  },

  /**
    * Resolves the path to api/ for the node application
    */
  apiPath: function () {
    if ( _.last( root.split('/') ) === 'node_modules') {
      resolvedPath = path.resolve( root, '../..');
      return resolvedPath + '/api';
    } else{
      return root + '/api';
    };
  },

  /**
    * Creates the controllers or models folder inside api
    */
  createFolder: function () {
    if ( !fs.existsSync( this.apiPath() + '/' + this.folderName ) ) {
      fs.mkdirSync( this.apiPath() + '/' + this.folderName);
    };
  },

  fileName: function () {
    return this.formattedFileName() + 'Controller';
  },

  /**
    * Give the controller name in a proper format i.e. Capitalized and Pluralized
    *
    *                                  OR
    *
    * Give the model name in a proper format i.e. Capitalized ad Singularized 
    */
  formattedFileName: function () {
    return inflect.capitalize( this.pluralizedName );
  },

  /**
    * decapitalize and pluralize the name
    */
  fileDestination: function () {
    return root + '/api/' + this.folderName + '/' + this.fileForm() + '_' + this.type + '.js';
  },

  /**
    * decapitalize and pluralize the name
    */
  fileForm: function () {
    return this.type == 'model' ? inflect.decapitalize( this.name ) : inflect.decapitalize( this.pluralizedName );
  }

};
