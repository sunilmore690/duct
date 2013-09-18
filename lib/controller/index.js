
/**
 * deps
 */

var _ = require('lodash')
  , util = require('../util')
  , inflect = require('inflect')
  , mongoose = require('mongoose');

/**
 * 
 */

module.exports = function(req, res, next) {

  'use strict'

  var segments, id, Model;

  // create and array of all uri segments
  // make sure to remove empty ones
  segments = _.without(req.params.toString().split('/'), '');

  // grab the last two (2) elements from the 
  // array and set the 'id' and 'model'
  _.each(_.last(segments, 2), function(segment) {
    if (segment.isObjectId()) {
      return id = segment;
    }
    Model = inflect.singularize(segment.capsFirst());
    Model = mongoose.model(Model);
  });

  // Put in work!

  if (!id && req.method === 'GET' || req.method === 'POST') {
    var conditions = {}, options;

    if (!id && _.size(req.body)) _.extend(conditions, req.body);
  
    options = {
      limit: req.query.limit || undefined,
      skip: req.query.skip || undefined
    };
    
    return Model.find(conditions, null, options, respond);
  }

  if (req.method === 'GET') {
    return Model.findById(id, respond);
  }

  if (req.method === 'POST') {
    return Model.create(req.body, respond);
  }

  if (req.method === 'PUT') {
    return Model.findByIdAndUpdate(id, req.body, respond);
  }

  if (req.method === 'DELETE') {
    return Model.findByIdAndRemove(id, respond);
  }

  function respond(err, result) {
    console.log(result);
    if (err || result == null) return next({ 
      error: 500 
    });
    // TODO add meta data to every request
    return res.json(result);
  }

};