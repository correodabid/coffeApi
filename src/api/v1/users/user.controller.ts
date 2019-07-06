import { Router, Request, Response, response } from 'express';
import Controller from '../../../interfaces/controller.interface';
import userModel from './user.model';
import IUser from './user.interface';
import { checkIsAdmin } from '../../../utils/utils';
class UserController implements Controller {
  public path = '/api/v1/users';
  public router = Router();
  private user = userModel;

  constructor() {
    this.initializeRouters();
    this.createAdminUser();
  }
  private initializeRouters() {
    this.router.get(this.path, this.getAllUsers);
    this.router.get(this.path, this.getAllUsers);
    this.router.get(`${this.path}/:id`, this.getUserById);
    this.router.get(`${this.path}/name/:username`, this.getUserByName);
    this.router.post(this.path, this.createUser);
    this.router.put(`${this.path}/:id`, this.updateUser);
    this.router.delete(`${this.path}/:id`, this.deleteUser);
    this.router.delete(`${this.path}/name/:username`, this.deleteUserByName);
  }

  private createAdminUser = () => {
    this.user.find({ username: 'admin' }).then((result: any) => {
      if (result.username) return;
      this.user.create({ username: 'admin', password: '1234', role: 'admin' });
    });
  };
  private getAllUsers = async (request: Request, response: Response) => {
    if (!request.headers.authorization) response.sendStatus(403);
    checkIsAdmin(String(request.headers.authorization)).then(async result => {
      if (!result) response.sendStatus(403);
      const res = await this.user.find();
      response.send(res);
    });
  };

  private getUserById = async (request: Request, response: Response) => {
    if (!request.headers.authorization) response.sendStatus(403);
    checkIsAdmin(String(request.headers.authorization)).then(async result => {
      if (!result) response.sendStatus(403);
      const res = await this.user.findById(request.params.id);
      response.send(res);
    });
  };

  private getUserByName = async (request: Request, response: Response) => {
    if (!request.headers.authorization) response.sendStatus(403);
    checkIsAdmin(String(request.headers.authorization)).then(async result => {
      if (!result) response.sendStatus(403);
      const res = await this.user.findOne({ username: request.params.username });
      response.send(res);
    });
  };

  private createUser = async (request: Request, response: Response) => {
    if (!request.headers.authorization) response.sendStatus(403);
    try {
      checkIsAdmin(String(request.headers.authorization)).then(async result => {
        if (!result) response.sendStatus(403);
        const newUser: IUser = request.body;
        const res = await this.user.create(newUser);
        response.send(res);
      });
    } catch (error) {
      response.sendStatus(403);
    }
  };

  private updateUser = async (request: Request, response: Response) => {
    if (!request.headers.authorization) response.sendStatus(403);
    try {
      checkIsAdmin(String(request.headers.authorization)).then(async result => {
        if (!result) response.sendStatus(403);
        const _user: IUser = request.body;
        const id = request.params.id;
        const res = await this.user.findByIdAndUpdate(id, _user);
        response.send(res);
      });
    } catch (error) {
      response.sendStatus(401);
    }
  };

  private deleteUser = async (request: Request, response: Response) => {
    if (!request.headers.authorization) response.sendStatus(403);
    try {
      checkIsAdmin(String(request.headers.authorization)).then(async result => {
        if (!result) response.sendStatus(403);
        const id = request.params.id;
        const res = await this.user.deleteOne({ _id: id });
        response.send(res);
      });
    } catch (error) {
      response.sendStatus(401);
    }
  };

  private deleteUserByName = async (request: Request, response: Response) => {
    if (!request.headers.authorization) response.sendStatus(403);
    try {
      checkIsAdmin(String(request.headers.authorization)).then(async result => {
        if (!result) response.sendStatus(403);
        const res = await this.user.deleteOne({ username: request.params.username });
        response.send(res);
      });
    } catch (error) {
      response.sendStatus(401);
    }
  };
}

export default UserController;
