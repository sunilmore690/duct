/**
  * TODO:
  *   Start actual work with this
  *
  */
module.exports = function(duct) {

  var _ = require('lodash'),
    util = require('../util'),
    EventEmitter = require('events').EventEmitter;

  return new Router();


  /**
   * Initialize a new `Router`
   *
   * @param {Object} options
   * @api private
   */

  function Router(options) {

    /**
     * Instantiate a Express app just to get some of that sweet, sweet routing goodness
     * (this Express app instance will not be used for listening for HTTP requests;
     * instead, one or more delegate servers can be attached)
     *
     */
     
    // Requires calling of load() before use, due to dynamic loading of NODE_ENV
    var expressApp;



    /**
     * Expose a new Router
     *
     * Link Express HTTP requests to a function which handles them
     *
     * @api public
     */

    Router.prototype.load = function(cb) {

      // Required for dynamic NODE_ENV setting via command line args
      expressApp = require('express');
      console.log('##########################');
      // console.log(duct);

      // Maintain a reference to the static route config
      this.staticRoutes = duct.config.routes;

      // Save reference to sails logger
      this.log = duct.log;

      // Save self-reference in sails
      duct.router = this;

      // Make slave router accesible
      duct.router._app = expressApp;

      // Listen for requests
      // duct.on('router:request', this.route);
      if (cb) {
        cb();
      };
    };

  }

};