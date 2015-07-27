
/**
 * native modules
 */

var fs = require('fs')
  , path = require('path')
  , util = require('util')
  , http = require('http')
  , events = require('events');

/**
 * 3rd party modules
 */

var Map = require('railway-routes').Map
  , inflect = require('inflect')
  , Controller = require('./controller');

/**
 * hoist up the class and export it
 */

module.exports = Duct;

/**
 * Main application constructor
 */

function Duct(server, config) {

  'use strict';
  
  // environment mode - default to development
  var env = this.env = process.env.NODE_ENV || 'development';

  // application root dir
  var root = this.root = process.cwd();

  var paths = this.paths = {
    config: root + '/config',
    models: root + '/api/models',
    controllers: root + '/api/controllers',
    initializers: root + '/initializers'
  };

  // global reference to config
  var config = this.config = config;

  // main express instance
  this.server = server;

   /**
   * initializers get loaded before
   * setting up the stack
   */

  var initializers = require(path.join(paths.config, 'initializers'));

  initializers.forEach(function(init) {
    try {
      require(path.join(this.paths.initializers, (init)))(this);
    }
    catch(err) {
      throw new Error('could not load initializer: ' + init);
      console.error(err);
    }
  }.bind(this));

}

/**
 * Give our app some pub/sub
 */

util.inherits(Duct, events.EventEmitter);

/**
 * 
 */

Duct.prototype.init = function() {

  /**
   * load controllers
   */

  this.controllers = {};
  
  fs.readdirSync(this.paths.controllers).forEach(function(file) {

    if (file.charAt(0) !== '.' && file.match(/.js/gi)) {
      var controllerName = file.substring(0, (file.lastIndexOf('_') - 1))
        , controller = require(this.paths.controllers + '/' + file)(this);
      // Not sure why I have to pluralize the name as the file name is already plural.
      this.controllers[inflect.pluralize(controllerName)] = new Controller(controller);
    }

  }.bind(this));

  /**
   * configure and load routes
   */

  var map = this.map = new Map(this.server, function(ns, ctrl, action) {
    if (ctrl in this.controllers && action in this.controllers[ctrl]) {
      return this.controllers[ctrl][action];
    }
    return function notFound(req, res) {
      res.send('Handler not found for ' + ctrl + '#' + action);
    }
  }.bind(this));
  
  require(this.paths.config + '/routes')(this);

  return this;

};

/**
 * creates our app server
 * @return {Object} this
 */

Duct.prototype.createServer = function(port) {
  http.createServer(this.server).listen(port);
  return this;
};

