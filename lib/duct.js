
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

  /**
   * base config
   */

  var duct = this.app;
  
  // environment mode - default to development
  this.env = process.env.NODE_ENV || 'development';

  // application root dir
  this.root = process.cwd();

  this.paths = {
    config: this.root + '/config',
    models: this.root + '/api/models',
    controllers: this.root + '/api/controllers',
    initializers: this.root + '/initializers'
  };

  this.config = require(this.paths.config + '/global_' + this.env);

  /**
   * Main express instance.
   * All other "apps" should be inhertied by `app`
   */

  var app = this.app = express();

  /**
   * initializers get run before 
   * configuring the environment.
   */

  var initializers = require(this.paths.config + '/initializers');

  initializers.forEach(function(init) {
    try {
      require(this.paths.initializers + '/' + init)(this);
    }
    catch(err) { console.log(err); }
  }.bind(this));

  // configure the express stack
  // and load the proper env file
  require(this.paths.config + '/environments')(this);

  /**
   * load the controllers and
   * kickoff routing
   */

  this.controllers = require('./controllers')(this);

  require('./routing')(this);

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

