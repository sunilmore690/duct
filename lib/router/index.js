module.exports = function(duct) {

  var  _ = require('lodash'),
      fs = require('fs'),
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

      // duct.routes = require(duct.paths.config + 'routes').routes; /* Apologies, this is a temp setup, just trying tomake this work */
      // console.log(duct.routes);

      // Maintain a reference to the static route config
      this.staticRoutes = duct.config.routes;

      console.log(duct);

      // Save self-reference
      duct.router = this;

      // Make slave router accesible
      duct.router._app = expressApp;

      // Listen for requests

      this.flush();

      // duct.on('router:request', this.route);
      duct.on('router:request', function() {});

      if (cb) {
        cb();
      };
    };

    Router.prototype.flush = function() {

      console.log('******* in Router Flush ***************');
      console.log('******* in Router Flush ***************');
      console.log('******* in Router Flush ***************');

      // this.reset();

      // Fired before static routes are bound
      duct.emit('router:before');

      // Use specified path to bind static routes
      _.each(this.staticRoutes, function(target, path) {
        this.bind(path, target);
      }, this);

      // Fired after static routes are bound, 
      // but BEFORE implicit routes
      duct.emit('router:beforeImplicit');

      // Fired after static routes are bound
      duct.emit('router:after');
    };

    /**
      * Start binding the routes
      */

    Router.prototype.bind = function(path, target, verb) {
      var detectedVerb = util.detectVerb(path);
      path = detectedVerb.original;
      
      // Preserve the explicit verb argument if it was specified
      if (!verb) {
        verb = detectedVerb.verb;
      }

      // if (_.isArray(target)) {
      //   console.log("bindArray = " + bindArray(path, target, verb));
      //   return _.bind(target, function (fn) {
      //     bind(path, fn, verb);
      //   });
      // }

      /** 
        * start detecting the typeof target
        *
        * String : View
        *
        */
      console.log('------------------ detecting the target -------------------------------');

      if (_.isObect( target ) && !util.isFunction( target ) && !_,isArray( target )) {
        if (_.isString( target.view )) {
          return this.bindView( path, target, verb );
        };
      }

    };

    Router.prototype.bindView = function(path, target, verb) {

      // get main folder
      mainView = target.view.split('/')[0];
      // get sub view if present or default to index action
      subView = target.view.split('/')[1] || 'index';
      console.log('-----------------------------------------------------------------------------------------------');
      console.log('-----------------------------------------------------------------------------------------------');
      console.log(duct.paths.views);
      views = fs.readdirSync( duct.path.views ); // move this out of here later on

      /**
        * todo: complete this section for rendering views
        */

    };

    // Bind the context of all instance methods
    _.bindAll(this);

  };

};