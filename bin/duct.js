#!/usr/bin/env node

var util = require('util'),
  fs = require('fs'),
  _ = require('lodash'),
  path = require('path'),
  inflect = require('inflect'),
  ControllerGenerator = require('../lib/generators/controller');

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
    nameARGV = args[4];

process.nextTick(function () {
  
  /**
    * trigger appropirate operations for generators 
    */

  switch (cmd) {
    case 'controller':
      console.log('in the controller of bin');
      var CG = new ControllerGenerator();
      CG.generate( nameARGV );
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
      break;

  }
});