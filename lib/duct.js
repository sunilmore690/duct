
/**
 * 
 */

var fs = require('fs')
  , http = require('http')
  , express = require('express');

function Duct() {

  'use strict';

  var duct = this;
  
  // environment mode
  this.env = process.env.NODE_ENV || 'development';

  // application root dir
  this.root = process.cwd();

  this.paths = {
    config: this.root + '/config/',
    models: this.root + '/api/models/',
    controllers: this.root + '/api/controllers/'
  };

  /**
   * Establish a pool of mongo
   * database connections.
   */
  this.db = require('./database');

  // app instance
  var app = this.app = express();

  // configure the express stack
  // and load the proper env file
  require(this.paths.config + 'environment')(this);

  // kickoff routing
  require('./routing').init(this);

}

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
  var environments = (this.paths.config + 'environments/');

  fs.readdirSync(environments).forEach(function(environment) {
    if (this.env === environment.split('.')[0]) {
      require(environments + environment);
    }
  }.bind(this));

};

module.exports = Duct;  
