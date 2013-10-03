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
    appPath = root + '/app',
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
  return _.capitalize( inflect.pluralize( name ) );
};

function controllerDestination ( name ) {
  root + '/app/controllers' + inflect.pluralize( name ) + '_controller.js';
};

/**
  * Creates the controller folder inside app
  */
function createControllerFolder () {
  fs.mkdirSync( appPath + '/controllers');
};

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
        *
        * Read the controller templates
        */
      var controller_template = fs.readFileSync( templatesPath + '/controller_template.js', 'utf8', function(err, data){
        if(err) throw err;
      });

      /**
        * Create the app/ folder and then the /app/controller/ folder 
        */
      if ( !fs.existsSync( appPath ) ) {
        fs.mkdirSync( appPath );
        createControllerFolder();
      }else {
        createControllerFolder();
      }

      /**
        * create the controller.js file
        */
      fs.writeFileSync( controllerDestination( nameARGV ) , controllerName( nameARGV ), 'utf8', function(err) {
        if (err) throw err;
        console.log('Controller created.');
      });

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
