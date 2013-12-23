
/**
 * This, "base adapter" and others like it would 
 * eventually become and actual message queue 
 * with adapters being persistance layers.
 */

var _ = require('lodash');

/**
 * 
 */

function Msgs(adapter) {
  adapter = adapter || {};
  
  /**
   * if an adapater was passed, override 
   * the "default". (not implemented yet)
   */

  _.extend(this, adapter);

}

/**
 * @name create
 *  
 */

Msgs.prototype.create = function(name, data) {
  return this;
};