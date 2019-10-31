const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'), // bodyParser Returns middleware that parses all bodies as a string and only looks at requests where the Content-Type header matches the type option
      cors = require('cors'), // Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources (e.g. fonts) on a web page to be requested from another domain outside the domain from which the first resource was served.
      mongoose = require('mongoose'),
      config = require('./DB');

const businessRoute = require('./routes/business.route');      

      mongoose.Promise = global.Promise;
      mongoose.connect(config.DB, {useNewUrlParser: true} ).then( () => {console.log('database connected') },
          err => { console.log('cannot connect to database '+err) }
      );

      const app = express();
      app.use(bodyParser.json());
      app.use(cors());
      app.use('/business', businessRoute); // app api routes

      const port = process.env.PORT || 4000;

      server = app.listen(port, function(){
          console.log('listening on port '+port);
      });
      