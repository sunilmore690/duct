#!/usr/bin/env node

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
    gen = args[2],
    cmd = appName = args[3],
    nameARGV = args[4],
    ControllerGenerator = require('../lib/generators/controller'),
    newAppGenerator = require('../lib/generators/new');

process.nextTick(function () {
  
  /**
    * trigger appropirate operations for generators 
    */
  switch(gen){
    case 'g':
    case 'generate':
      switch (cmd) {
        case 'controller':
          (new ControllerGenerator( nameARGV )).generate();
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
      };
      break;

    case 'new':
      console.log('Generating new Duct app..');
      (new newAppGenerator( appName )).generate();
      break;

      default:
      case'h':
      case 'help':
        console.log('Usage for Duct');
        console.log('command                        purpose');
        console.log('g  generate controller <name>  generates a controller with routes');
        break;
  };
});