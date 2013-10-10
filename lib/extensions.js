
/**
 * Extension loader
 */

var fs = require('fs');

module.exports = function(duct) {

  if (!fs.existsSync(duct.paths.extensions)) return false;

  var extensions = fs.readdirSync(duct.paths.extensions);

  extensions.forEach(function(ext) {
    if (typeof ext === 'function' && 'init' in ext) {
      ext.init(duct);
    }
  });

};