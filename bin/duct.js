#!/usr/bin/env node

var util = require('util'),
  fs = require('fs'),
  _ = require('lodash'),
  path = require('path'),
  inflect = require('inflect');

/**
  * Check if Duct is loaded
  */
// if (!Duct) {
//   var Duct = require('duct');
// };


/**
  *  
  * GENERATORS ONLY FOR NOW!!
  *
  * Capture the arguments for starting the process
  * ex:
  *    duct generate controller
  *
  * in this case, command = 'generate'
  *
  *  todo: pull it out into a different module
  */
var args = process.argv,
    cmd = args[3],
    nameARGV = args[4],
    root = process.cwd(),
    // rootPath = root + '/app',
    templatesPath = '../templates';

/**
  * this function would give you the main template for the controller which is dynamically formed
  * meaning, if you the command says :
  *  duct generate controller post
  * 
  * then the file should be posts_controller.js
  */
function controllerName( name ) {
  return controllerName = formattedControllerName( name ) + 'Controller';
};

/**
  * Give the controller name in a proper format i.e. Capitalized and Pluralized
  */
function formattedControllerName( name ) {
  var pluralized = inflect.pluralize( name );
  return inflect.capitalize( pluralized );
};

/**
  * decapitalize and pluralize the name
  */
function controllerDestination ( name ) {
  return root + '/app/controllers/' + inflect.decapitalize( inflect.pluralize( name ) ) + '_controller.js';
};

/**
  * Creates the controller folder inside app
  */
function createControllerFolder () {
  if ( !fs.existsSync(appPath() + '/controllers') ) {
    fs.mkdirSync( appPath() + '/controllers');
  };
};

/**
  * Resolves and gives you the path for the template to read
  *  Controller_template, Model_template and so on
  */
function getTemplatesPath ( type ) {
  templateName = type + '_template.js';
  return path.resolve( __dirname, '..', 'templates/' + templateName );
}

/**
  * Resolves the path to app/ for the node application
  */
function appPath () {
  if ( _.last( root.split('/') ) === 'node_modules') {
    resolvedPath = path.resolve( root, '../..');
    return resolvedPath + '/app';
  } else{
    return root + '/app';
  };
}

process.nextTick(function () {
  
  /**
    * trigger appropirate operations for generators 
    */

  switch (cmd) {
    case 'controller':
      console.log('Generating a controller from the command line');

      /**
        * TODO: Revise this flow
        *
        * Read the controller templates
        */
      var controller_template = fs.readFileSync( getTemplatesPath( 'controller' ) , 'utf8', function(err, data){
                                  if(err) throw err;
                                });
      
      /**
        * Create the app/ folder and then the /app/controller/ folder 
        */
      if ( !fs.existsSync( appPath() ) ) {
        fs.mkdirSync( appPath() );
        createControllerFolder();
      }else {
        createControllerFolder();
      }

      /**
        * create the controller.js file
        */
      if ( fs.existsSync( controllerDestination( nameARGV ) ) ) {
        console.log( inflect.decapitalize( inflect.pluralize( nameARGV ) ) + '_controller already exists');
      } else{
        fs.writeFileSync( controllerDestination( nameARGV ) , controllerName( nameARGV ), 'utf8', function(err) {
          if (err) throw err;
          console.log( inflect.decapitalize( inflect.pluralize( nameARGV ) ) +'_controller created.');
        });
      };

      break;

    case 'model':
      console.log('Generating a model from the command line is coming soon');
      break;

    default:
    case'h':
    case 'help':
      console.log('Usage for Duct');
      console.log('command                        purpose');
      console.log('g  generate controller <name>  generates a controller with routes');
      console.log('g  generate controller <name>  generates a controller with routes');
      break;

  }
});