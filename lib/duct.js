
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

var inflect = require('inflect')
  , Map = require('railway-routes').Map
  , Controller = require('./controller');

/**
 * hoist up the class and export it
 */

module.exports = Duct;

/**
 * Main application constructor
 */

function Duct(server) {

  'use strict';

  var duct = this;
  
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

  this.config = require(paths.config + '/global_' + env);

  // Main express instance.
  this.server = server;

  server.use(function(req, res, next) {
    req.Model = (function() {
      var url = req.url.substring(1, req.url.length)
        , end = req.url.indexOf('/') === -1 ? req.url.length : (req.url.indexOf('/') - 1)
        , url = req.url.substring(1, end);
      console.log(duct.models)
      console.log(url);
      return inflect.singularize  (url);
    })();
    next();
  });

  /**
   * initializers get loaded before
   * configuring the environment
   * and setting up the stack
   */

  var initializers = require(path.join(duct.paths.config, 'initializers'));

  initializers.forEach(function(init) {
    var filePath = path.join(this.paths.initializers, (init + '.js'));
    if (fs.existsSync(filePath)) {
      require(filePath)(this);
    }
  }.bind(this));

  duct.emit('init:initializers'); // not sure if this is used or not

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

  var map = duct.map = new Map(this.server, function(ns, ctrl, action) {
    if (ctrl in this.controllers && action in this.controllers[ctrl]) {
      return this.controllers[ctrl][action];
    }
    return function notFound(req, res) {
      res.send('Handler not found for ' + ctrl + '#' + action);
    }
  }.bind(this));
  
  require(duct.paths.config + '/routes')(map)

}

/**
 * Give our app some pub/sub
 */

util.inherits(Duct, events.EventEmitter);

/**
 * creates our app server
 * @return {Object} this
 */

Duct.prototype.createServer = function(port) {
  http.createServer(this.server).listen(port);
  return this;
};

