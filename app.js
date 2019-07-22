const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv/config');
const filmsRoute = require('./films/films.router');
Promise = require('bluebird');

class Application {
  constructor() {}

  async init() {
    this._app = express();

    this._initMiddleware();
    await this._initMongoConnection();
    this._initRoutes();
    
    this._app.listen(process.env.PORT, () => {
      console.log("Server listening on port", process.env.PORT);
    });

    return this._app;
  }

  async clearMongoDb() {
    let collections = mongoose.connection.collections;
    return Promise.resolve(Object.values(collections))
      .mapSeries(collection => {
        return collections[collection.name].drop();
      })
      .then(() => console.log('Cleared up database'))
      .catch(err => console.log('Error occured when tried to clear MongoDB', err));
  }

  _initMiddleware() {
    this._app.use(bodyParser.json());
    this._app.use(bodyParser.urlencoded({extended: true}));
    this._app.use(express.static(__dirname + "/public"));
  }

  _initMongoConnection() {
    return mongoose.connect(
      process.env.DB_CONNECTION,
      { useNewUrlParser:true, useFindAndModify: false },
      (err) => {
        if (err)
          return console.log(err);

        console.log("connected to db");
      }
    );
  }

  _initRoutes() {
    this._app.use('/films', filmsRoute);
  }
}

if (require.main === module) { // if module was called directly
  return new Application().init();
} else {
  module.exports = new Application();
}
