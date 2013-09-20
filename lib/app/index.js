
/**
 * this file is essentially a "bootstrap"
 */

var _  = require('lodash')
  , fs = require('fs')
  , inflect = require('inflect')
  , EventEmitter = require('events').EventEmitter
  , express = require('express')
  , mongoose = require('mongoose')
  , timestamps = require('mongoose-concrete-timestamps')
  , pagination = require('mongoose-cursor')
  , controller = require('../controller')
  , config = require('./config');

/**
 * 
 */

function Duct() {


  var duct = this;

  /**
   * connect to the database and
   * create a connection pool
   */
  
  this.db  = require('../db');

  /**
   * autoloading
   */
  
  // storage
  this.config = {};
  this.models = {};

  console.log(this);

  // paths base set first
  this.paths = { app: process.cwd() + '/' };

  _.extend(this.paths, {
    config: this.paths.app + 'config/',
    models: this.paths.app + 'api/models/',
    controllers: this.paths.app + 'api/controllers/',
    views: this.paths.app + 'api/views/'
  });

  _.each(this.paths, _.bind(function(path, name) {
    if (name === 'app') return;

    /**
     * Load config
     * TODO break this out to config.js
     */

    if (name === 'config') {
      _.each(fs.readdirSync(path), _.bind(function(file) {
        this.config[file.replace('.js','')] = (require(path + file));
      }, this));
    }

    /**
     * Register models
     * TODO break this out to models.js
     */

    if (name === 'models') {
      _.each(fs.readdirSync(path), _.bind(function(file) {

        var modelSchema = new mongoose.Schema(require(path + file))
          , modelName = inflect.singularize(file.replace('.js','').capsFirst());
          console.log(modelName);

        // attach plugins
        modelSchema.plugin(timestamps);
        // modelSchema.plugin(pagination);

        this.models[modelName] = mongoose.model(modelName, modelSchema);

      }, this));
    }

  }, this));

  /**
    * loading configurations
    * might include routes, initializers and so on
    */

  duct.load = this.load = config(duct);
  duct.load();

  /**
   * instatiate the app
   * TODO move this out
   */
  this.app = express();

  // TODO add config for all of this
  this.app.use(express.logger('dev'));
  this.app.use(express.methodOverride());
  this.app.use(express.errorHandler());
  this.app.use(express.cookieParser());
  this.app.use(express.bodyParser());
  this.app.use(this.app.router);
  
  this.app.all('/api/*', controller)

  console.log('starting....');

  this.app.listen(3000);

}

// _.extend( Duct.prototype, new EventEmitter() );
Duct.prototype = new EventEmitter();
Duct.prototype.constructor = Duct;

module.exports = Duct;
