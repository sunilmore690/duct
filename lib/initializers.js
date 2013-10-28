
/**
 * 
 */

var fs = require('fs')
  , path = require('path');

/**
 *
 */

module.exports = function(duct) {

  var initializers = require(path.join(duct.paths.config, 'initializers'));

  initializers.forEach(function(init) {
    var filePath = path.join(duct.paths.initializers, (init + '.js'));

    if (fs.existsSync(filePath)) {
      require(filePath)(duct);
    }
    
  });

  duct.emit('init:initializers');

};