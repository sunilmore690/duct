module.exports = ControllerGenerator;

var fs = require('fs'),
  util = require('util'),
     _ = require('lodash'),
  root = process.cwd(),
  path = require('path'),
  inflect = require('inflect'),
  hbs = require('handlebars');

function ControllerGenerator (name) {
  this.name = name;
  this.pluralizedName = inflect.pluralize( name );
};

ControllerGenerator.prototype = {

  generate: function() {
    var _this = this;
    console.log('Generating a controller from the command line');

    /**
      * TODO: Revise this flow
      *
      * Read the controller templates
      * NEEDS WORK !!
      */
    var controllerTemplate = fs.readFileSync( this.getTemplatesPath( 'controller' ) , 'utf8' );
    
    /**
      * Compile and parse coontroller Template with Handlebars
      */
    var compiledHBStemplate = hbs.compile( controllerTemplate );

    /**
      * Create the app/ folder and then the /app/controller/ folder 
      */
    if ( !fs.existsSync( this.appPath() ) ) {
      fs.mkdirSync( this.appPath() );
      this.createControllerFolder();
    }else {
      this.createControllerFolder();
    }

    /**
      * create the controller.js file
      */
    if ( fs.existsSync( this.controllerDestination() ) ) {
      console.log( inflect.decapitalize( this.pluralizedName ) + '_controller already exists');
    } else{

      /**
        * Write to the file, this will also create the file
        */
      fs.writeFile( this.controllerDestination() , compiledHBStemplate( { name: inflect.capitalize( this.pluralizedName ) } ), 'utf8', function(err) {
        if (err) throw err;
        console.log( inflect.decapitalize( _this.pluralizedName ) +'_controller file created.');
      });
    };
  },

  /**
    * Resolves and gives you the path for the template to read
    *  Controller_template, Model_template and so on
    */
  getTemplatesPath: function ( type ) {
    templateName = type + '_template.js';
    return path.resolve( __dirname, '../..', 'templates/' + templateName );
  },

  /**
    * Resolves the path to app/ for the node application
    */
  appPath: function () {
    if ( _.last( root.split('/') ) === 'node_modules') {
      resolvedPath = path.resolve( root, '../..');
      return resolvedPath + '/app';
    } else{
      return root + '/app';
    };
  },

  /**
    * Creates the controller folder inside app
    */
  createControllerFolder: function () {
    if ( !fs.existsSync( this.appPath() + '/controllers' ) ) {
      fs.mkdirSync( this.appPath() + '/controllers');
    };
  },

  /**
    * this function would give you the main template for the controller which is dynamically formed
    * meaning, if you the command says :
    *  duct generate controller post
    * 
    * then the file should be posts_controller.js
    */
  controllerName: function () {
    return controllerName = this.formattedControllerName() + 'Controller';
  },

  /**
    * Give the controller name in a proper format i.e. Capitalized and Pluralized
    */
  formattedControllerName: function () {
    return inflect.capitalize( this.pluralizedName );
  },

  /**
    * decapitalize and pluralize the name
    */
  controllerDestination: function () {
    return root + '/app/controllers/' + inflect.decapitalize( this.pluralizedName ) + '_controller.js';
  }
};
