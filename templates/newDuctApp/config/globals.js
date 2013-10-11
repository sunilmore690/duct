
  /*
  
  Options for mongoose to connect to MongoDB

  db      - passed to the connection db instance
  server  - passed to the connection server instance(s)
  user    - username for authentication (if not specified in uri)
  pass    - password for authentication (if not specified in uri)
  auth    - options for authentication
  replset - passed to the connection ReplSet instance
  mongos  - Boolean - if true, enables High Availability support for mongos
  
  You can add replset and mongos if you want later ahead.
  */

exports.development = {
    
  db: {

    uri: 'mongodb://localhost//db',

    options: {
      server: {
        poolSize: 5
      }
    },

    log_level: 'debug'
  }

};


exports.production =  {

  db: {
    uri: 'mongodb://server//db',

    options: {
      server: {
        poolSize: 5
      }
    },

    log_level: 'debug'
  }

};
