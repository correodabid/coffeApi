import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../../../interfaces/controller.interface';
import orderModel from './order.model';
import IOrder from './order.interface';
import coffeeModel from '../coffees/coffe.model';
import jwt from 'jsonwebtoken';
import key from '../../../key';
import { checkPermissions, logger } from '../../../utils/utils';

class OrderController implements Controller {
  public path = '/api/v1/orders';
  public router = Router();
  private order = orderModel;
  private coffee = coffeeModel;

  constructor() {
    this.initializeRouters();
  }
  private initializeRouters() {
    this.router.get(this.path, checkPermissions, this.getAllOrders);
    this.router.get(`${this.path}/:id`, checkPermissions, this.getOrderById);
    this.router.post(this.path, this.createOrder);
    this.router.put(`${this.path}/:id`, checkPermissions, this.updateOrder);
    this.router.delete(`${this.path}/:id`, checkPermissions, this.deleteOrder);
  }

  private getAllOrders = async (request: Request, response: Response) => {
    try {
      const res = await this.order.find({});
      response.send(res);
    } catch (error) {
      response.end();
    }
  };

  private getOrderById = async (request: Request, response: Response) => {
    try {
      const res = await this.order.findById(request.params.id);
      response.send(res);
    } catch (error) {
      response.send(error);
    }
  };

  private createOrder = async (request: Request, response: Response) => {
    if (!request.headers.authorization) response.sendStatus(403);
    try {
      jwt.verify(String(request.headers.authorization), key.tokenKey);
      let newOrder = request.body;
      const updatedCoffee: any = await this.coffee.findById(newOrder.coffee_id);
      const newStock = updatedCoffee.stock - newOrder.quantity;
      if (newStock < 0) {
        logger.log('info', 'ERROR SET ORDER: out of stock');
        response.sendStatus(404);
        return;
      }
      await this.coffee.findByIdAndUpdate(updatedCoffee._id, { stock: newStock });
      newOrder.amount = newOrder.quantity * updatedCoffee.price;
      const res = await this.order.create(newOrder);
      logger.log('info', `SET ORDER: order ${newOrder.quantity} units of coffee`);
      logger.log('info', JSON.stringify(newOrder));
      logger.log(
        'info',
        `UPDATED COFFEE ${updatedCoffee.name}: ${newOrder.quantity} units of coffee consumed`,
      );
      logger.log('info', JSON.stringify(updatedCoffee));
      response.send(res);
    } catch (error) {
      response.send(error);
    }
  };

  private updateOrder = async (request: Request, response: Response) => {
    try {
      const _order: IOrder = request.body;
      const id = request.params.id;
      const res = await this.order.findByIdAndUpdate(id, _order);
      response.send(res);
    } catch (error) {
      response.send(error);
    }
  };

  private deleteOrder = async (request: Request, response: Response) => {
    try {
      const id = request.params.id;
      const res = await this.order.deleteOne({ _id: id });
      response.send(res);
    } catch (error) {
      response.send(error);
    }
  };
}

export default OrderController;
