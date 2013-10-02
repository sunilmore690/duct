#!/usr/bin/env node

var util = require('util'),
  fs = require('fs'),
  _ = require('lodash'),
  path = require('path'),
  pluralize = require('../lib/pluralize');

/**
  * Check if Duct is loaded
  */
if (!Duct) {
  var Duct = require('duct');
};


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
    cmd = args[2],
    nameARGV = args[3],
    root = process.cwd(),
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
  return _.capitalize( pluralize.inflect( name ) );
};

function controllerDestination ( name ) {
  root + '/app/controllers' + pluralize.inflect( name ) + '_controller.js';
}

process.nextTick(function () {
  
  /**
    * trigger appropirate operations for generators 
    */

  switch (val) {
    case 'controller':
      console.log('Generating a controller from the command line');

      var controller_template = fs.readFileSync( templatesPath + '/controller_template.js', 'utf8', function(err, data){
        if(err) throw err;
      });

      fs.fs.writeFileSync( controllerDestination( nameARGV ) , controllerName( nameARGV ), 'utf8', function(err) {
        if (err) throw err;
        console.log('Controller created.');
      });
      break;

    case 'model':
      console.log('Generating a model from the command line is coming soon');
      break;
  }

})