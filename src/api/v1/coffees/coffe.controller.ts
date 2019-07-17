import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../../../interfaces/controller.interface';
import coffeeModel from './coffe.model';
import jwt from 'jsonwebtoken';
import key from '../../../key';
import { checkPermissions, logger } from '../../../utils/utils';

class CoffeeController implements Controller {
  public path = '/api/v1/coffees';
  public router = Router();
  private coffee = coffeeModel;

  constructor() {
    this.initializeRouters();
  }
  private initializeRouters() {
    this.router.get(this.path, this.getAllCoffees);
    this.router.get(`${this.path}/:id`, this.getCoffeeById);
    this.router.get(`${this.path}/name/:coffeeName`, this.getCoffeeByName);
    this.router.post(this.path, checkPermissions, this.createCoffee);
    this.router.put(`${this.path}/:id`, this.updateCoffee);
    this.router.delete(`${this.path}/:id`, checkPermissions, this.deleteCoffee);
    this.router.delete(`${this.path}/name/:coffeeName`, checkPermissions, this.deleteCoffeeByName);
  }

  private getAllCoffees = async (request: Request, response: Response) => {
    if (!request.headers.authorization) response.sendStatus(403);
    try {
      jwt.verify(String(request.headers.authorization), key.tokenKey);
      const res = await this.coffee.find({});
      response.send(res);
    } catch (error) {
      response.send(error);
    }
  };

  private getCoffeeById = async (request: Request, response: Response) => {
    if (!request.headers.authorization) response.sendStatus(403);
    try {
      jwt.verify(String(request.headers.authorization), key.tokenKey);
      const id = request.params.id;
      const res = await this.coffee.findById(id);
      response.send(res);
    } catch (error) {
      response.send(error);
    }
  };

  private getCoffeeByName = async (request: Request, response: Response) => {
    if (!request.headers.authorization) response.sendStatus(403);
    try {
      jwt.verify(String(request.headers.authorization), key.tokenKey);
      const res = await this.coffee.findOne({ name: request.params.coffeeName });
      response.send(res);
    } catch (error) {
      response.send(error);
    }
  };

  private createCoffee = async (request: Request, response: Response) => {
    if (!request.headers.authorization) response.sendStatus(403);
    try {
      const newCoffee = request.body;
      logger.log('info', 'SET COFFEE: ');
      logger.log('info', JSON.stringify(newCoffee));
      const res = await this.coffee.create(newCoffee);
      response.send(res);
    } catch (error) {
      response.send(error);
    }
  };

  private updateCoffee = async (request: Request, response: Response) => {
    try {
      const _coffee = request.body;
      const id = request.params.id;
      const res = await this.coffee.findByIdAndUpdate(id, _coffee);
      response.send(res);
    } catch (error) {
      response.send(error);
    }
  };

  private deleteCoffee = async (request: Request, response: Response) => {
    try {
      const id = request.params.id;
      const res = await this.coffee.findByIdAndDelete(id);
      response.send(res);
    } catch (error) {
      response.send(error);
    }
  };

  private deleteCoffeeByName = async (request: Request, response: Response) => {
    try {
      const res = await this.coffee.findOneAndDelete({ name: request.params.coffeeName });
      response.send(res);
    } catch (error) {
      response.send(error);
    }
  };
}

export default CoffeeController;
