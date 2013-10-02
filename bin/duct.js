#!/usr/bin/env node

var util = require('util'),
  fs = require('fs'),
  path = require('path');

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
var args = process.argv
var cmd = args[2];

process.nextTick(function () {
  
  /**
    * trigger appropirate operations for generators 
    */

  switch (val) {
    case 'controller':
      console.log('Generating a controller from the command line');
      break;

    case 'model':
      console.log('Generating a model from the command line is coming soon');
      break;

  }

})