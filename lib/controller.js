
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
  req.Model.find(this.respond.apply(this, arguments));
};

Controller.prototype.show = function(req, res, next) {
  req.Model.findById(req.params.id, this.respond.apply(this, arguments));
};

Controller.prototype.update = function(req, res, next) {
  req.Model.findByIdAndUpdate(req.params.id, this.respond.apply(this, arguments));
};

Controller.prototype.destroy = function(req, res, next) {
  req.Model.findByIdAndRemove(req.params.id, this.respond.apply(this, arguments));
};

/**
 * @name respond
 * @returns {Object} sends response to browser
 */

Controller.prototype.respond = function(req, res, next) {
  return function() {
    if (err) return next(err);
    res.json(docs);
  }
};
