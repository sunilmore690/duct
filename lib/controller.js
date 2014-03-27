
/**
 * 3rd party dependencies
 */

var _ = require('lodash');

/**
 * constructor
 */

function Controller(_prototype) {
  _.extend(this, _prototype);
  _.bindAll(this, 'index', 'show', 'update', 'destroy');
}

module.exports = Controller;

/**
 * default crud operations
 */

Controller.prototype.index = function(req, res, next) {
  if (!this.Model) return next(404);
  this.Model.find(this.respond(req, res, next));
};

Controller.prototype.create = function(req, res, next) {
  this.Model.create(req.body, this.respond(req, res, next));
};

Controller.prototype.show = function(req, res, next) {
  if (!this.Model) return next(404);
  this.Model.findById(req.params.id, this.respond(req, res, next));
};

Controller.prototype.update = function(req, res, next) {
  if (!this.Model) return next(404);
  if (req.body._id) delete req.body._id;
  this.Model.findByIdAndUpdate(req.params.id, req.body, this.respond(req, res, next));
};

Controller.prototype.destroy = function(req, res, next) {
  if (!this.Model) return next(404);
  this.Model.findByIdAndRemove(req.params.id, this.respond(req, res, next));
};

/**
 * @name respond
 * @returns {Object} sends a response to the browser
 */

Controller.prototype.respond = function(req, res, next) {
  return function(err, results) {
    if (err) return next(err);
    res.json(results);
  }
};
