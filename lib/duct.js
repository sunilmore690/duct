
/**
 * 
 */

var Server = require('./server');

function Duct() {

  var duct = this;
  
  // application root dir
  this.root = process.cwd();

  this.paths = {
    models: this.root + '/models',
    controllers: this.root + '/controllers'
  };

  // autoloading
  // this.models = models(this);
  // this.controllers = controllers(this);



  this.server = new Server(duct);
  this.server.init();

  // 

} 

module.exports = Duct;