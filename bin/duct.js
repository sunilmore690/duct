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
var args = process.argv,
    cmd = args[2],
    root = process.cwd(),
    templatesPath = '../templates';

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

      fs.fs.writeFileSync( root + '/app/controllers', 'controller_template', 'utf8', function(err) {
        if (err) throw err;
        console.log('Controller created.');
      });
      break;

    case 'model':
      console.log('Generating a model from the command line is coming soon');
      break;
  }

})