module.exports = ControllerGenerator;

var util = require('util'),
  fs = require('fs'),
  _ = require('lodash'),
  path = require('path'),
  inflect = require('inflect'),
  root = process.cwd(),
  hbs = require('handlebars');

function ControllerGenerator () {};

ControllerGenerator.prototype.generate = function( name ) {
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
  if ( fs.existsSync( this.controllerDestination( name ) ) ) {
    console.log( inflect.decapitalize( inflect.pluralize( name ) ) + '_controller already exists');
  } else{

    /**
      * Write to the file, this will also create the file
      */
    fs.writeFile( this.controllerDestination( name ) , compiledHBStemplate( {name: inflect.pluralize( name ) } ), 'utf8', function(err) {
      if (err) throw err;
      console.log( inflect.decapitalize( inflect.pluralize( name ) ) +'_controller created.');
    });
  };
};

/**
  * Resolves and gives you the path for the template to read
  *  Controller_template, Model_template and so on
  */
ControllerGenerator.prototype.getTemplatesPath = function ( type ) {
  templateName = type + '_template.js';
  return path.resolve( __dirname, '../..', 'templates/' + templateName );
}

/**
  * Resolves the path to app/ for the node application
  */
ControllerGenerator.prototype.appPath = function () {
  if ( _.last( root.split('/') ) === 'node_modules') {
    resolvedPath = path.resolve( root, '../..');
    return resolvedPath + '/app';
  } else{
    return root + '/app';
  };
}

/**
  * Creates the controller folder inside app
  */
ControllerGenerator.prototype.createControllerFolder = function () {
  if ( !fs.existsSync( this.appPath() + '/controllers' ) ) {
    fs.mkdirSync( this.appPath() + '/controllers');
  };
};

/**
  * this function would give you the main template for the controller which is dynamically formed
  * meaning, if you the command says :
  *  duct generate controller post
  * 
  * then the file should be posts_controller.js
  */
ControllerGenerator.prototype.controllerName = function ( name ) {
  return controllerName = this.formattedControllerName( name ) + 'Controller';
};

/**
  * Give the controller name in a proper format i.e. Capitalized and Pluralized
  */
ControllerGenerator.prototype.formattedControllerName = function ( name ) {
  var pluralized = inflect.pluralize( name );
  return inflect.capitalize( pluralized );
};

/**
  * decapitalize and pluralize the name
  */
ControllerGenerator.prototype.controllerDestination = function ( name ) {
  return root + '/app/controllers/' + inflect.decapitalize( inflect.pluralize( name ) ) + '_controller.js';
};

