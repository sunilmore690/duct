
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

  var duct = this, app;
  
  // environment mode - default to development
  this.env = process.env.NODE_ENV || 'development';

  // application root dir
  this.root = process.cwd();

  this.paths = {
    config: this.root + '/config/',
    models: this.root + '/api/models/',
    controllers: this.root + '/api/controllers/',
    extensions: this.root + '/api/extensions/'
  };

  /**
   * Establish a pool of mongo
   * database connections.
   */
  this.db = require('./database');

  // express app instance
  app = this.app = express();

  // configure the express stack
  // and load the proper env file
  require(this.paths.config + 'environment')(this);

  // kickoff routing
  require('./routing').init(this);

  // finallly, load extensions
  require('./extensions')(this);

}

/**
 * Give our app some pub/sub
 */

util.inherits(Duct, events.EventEmitter);


/**
 * creates our app server
 * @return {void}
 */

Duct.prototype.createServer = function() {
  http.createServer(this.app).listen(3000);
};

/**
 * 
 */

Duct.prototype.loadConfig = function() {
  var path = (this.paths.config + 'environments/')
    , environments = fs.readdirSync(path);

  environments.forEach(function(environment) {
    if (this.env === environment.split('.')[0]) {
      require(path + environment);
    }
  }.bind(this));

};
