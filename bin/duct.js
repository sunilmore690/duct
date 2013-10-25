#!/usr/bin/env node

/**
  *  
  * Command line executions for duct
  *
  */
var args = process.argv,
    gen = args[2],
    cmd = appName = args[3],
    nameARGV = args[4],
    generators = require('../generators');

process.nextTick(function () {
  
  /**
    * trigger appropirate operations for generators 
    */
  switch(gen){
    case 'g':
    case 'generate':
      switch (cmd) {
        case 'controller':
          (new generators.controller( nameARGV, 'controller' )).generate();
          break;

        case 'model':
          (new generators.controller( nameARGV, 'model' )).generate();
          break;

        default:
        case'h':
        case 'help':
          console.log('Usage for Duct');
          console.log('command                        purpose');
          console.log('new <name>                     generates a new app');
          console.log('g  generate controller <name>  generates a controller with routes');
          break;
      };
      break;

    case 'new':
      console.log('Generating new Duct app..');
      (new generators.newDuctApp( appName )).generate();
      break;

      default:
      case'h':
      case 'help':
        console.log('Usage for Duct');
        console.log('command                        purpose');
        console.log('new <name>                     generates a new app');
        console.log('g  generate controller <name>  generates a controller with routes');
        break;
  };
});