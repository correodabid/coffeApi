import _ from 'lodash';
import express from 'express';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Controller from './interfaces/controller.interface';
import { deploy } from './config';

class App {
  public app: express.Application;
  public port = 8006;

  constructor(controllers: Controller[]) {
    mongoose.connect(`mongodb://${deploy.url}:${deploy.port}/coffee-dev`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    this.app = express();
    this.app.use(express.static('client'));
    this.initializeMiddleware();
    this.initializeControllers(controllers);
  }

  public listen() {
    this.app.listen(this.port, () => console.log(`App listening on port ${this.port}`));
  }

  private initializeMiddleware() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    });
  }
}

export default App;
