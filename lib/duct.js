
/**
 * 
 */

var fs = require('fs')
  , util = require('util')
  , http = require('http')
  , events = require('events')
  , express = require('express');

// hoisted
module.exports = Duct;

/**
 * Main application constructor
 */
function Duct() {

  'use strict';

  var duct = this;
  
  // environment mode - default to development
  var env = this.env = process.env.NODE_ENV || 'development';

  // application root dir
  var root = this.root = process.cwd();

  var paths = this.paths = {
    config: this.root + '/config',
    models: this.root + '/api/models',
    controllers: this.root + '/api/controllers',
    initializers: this.root + '/initializers'
  };

  this.config = require(paths.config + '/global_' + env);

  // Main express instance.
  var app = this.app = express();

  
  // initializers get run before 
  // configuring the environment
  // and setting up the stack
  require('./initializers')(this);

  // configure the express stack
  // and load the proper env file
  require(paths.config + '/environments')(this);

  // load controllers
  this.controllers = require('./controllers')(this);

  // kickoff routing
  require('./router')(this);

}

/**
 * Give our app some pub/sub
 */

util.inherits(Duct, events.EventEmitter);


/**
 * creates our app server
 * @return {Ohject} this
 */

Duct.prototype.createServer = function() {
  http.createServer(this.app).listen(3000);
  return this;
};

/**
 * 
 */

Duct.prototype.loadEnv = function() {
  var path = (this.paths.config + 'environments/')
    , environments = fs.readdirSync(path);

  environments.forEach(function(environment) {
    if (this.env === environment.split('.')[0]) {
      require(path + environment)(this);
    }
  }.bind(this));

};

