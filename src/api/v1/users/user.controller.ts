import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../../../interfaces/controller.interface';
import userModel from './user.model';
import IUser from './user.interface';
import { checkPermissions } from '../../../utils/utils';
import bcrypt from 'bcrypt';

const BCRYPT_SALT_ROUNDS = 12;
class UserController implements Controller {
  public path = '/api/v1/users';
  public router = Router();
  private user = userModel;

  constructor() {
    this.initializeRouters();
    // this.createAdminUser();
  }
  private initializeRouters() {
    this.router.get(this.path, checkPermissions, this.getAllUsers);
    this.router.get(this.path, this.getAllUsers);
    this.router.get(`${this.path}/:id`, checkPermissions, this.getUserById);
    this.router.get(`${this.path}/name/:username`, checkPermissions, this.getUserByName);
    this.router.post(this.path, checkPermissions, this.createUser);
    this.router.put(`${this.path}/:id`, checkPermissions, this.updateUser);
    this.router.delete(`${this.path}/:id`, checkPermissions, this.deleteUser);
    this.router.delete(`${this.path}/name/:username`, checkPermissions, this.deleteUserByName);
  }

  private createAdminUser = () => {
    try {
      this.user.find({ username: 'admin' }).then((result: any) => {
        if (result.username) return;
        bcrypt.hash('1234', BCRYPT_SALT_ROUNDS).then((hashedPassword) => {
          this.user.create({ username: 'admin', password: hashedPassword, role: 'admin' });
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  private getAllUsers = async (request: Request, response: Response) => {
    try {
      const res = await this.user.find();
      response.send(res);
    } catch (error) {
      response.send(error);
    }
  };

  private getUserById = async (request: Request, response: Response) => {
    try {
      const res = await this.user.findById(request.params.id);
      response.send(res);
    } catch (error) {
      response.send(error);
    }
  };

  private getUserByName = async (request: Request, response: Response) => {
    try {
      const res = await this.user.findOne({ username: request.params.username });
      response.send(res);
    } catch (error) {
      response.send(error);
    }
  };

  private createUser = async (request: Request, response: Response) => {
    try {
      const newUser: IUser = request.body;
      bcrypt.hash(newUser.password, BCRYPT_SALT_ROUNDS).then(async (hashedPassword) => {
        const res = await this.user.create({
          username: newUser.username,
          password: hashedPassword,
          role: newUser.role,
        });
        response.send(res);
      });
    } catch (error) {
      response.send(error);
    }
  };

  private updateUser = async (request: Request, response: Response) => {
    try {
      const _user: IUser = request.body;
      const id = request.params.id;
      bcrypt.hash(_user.password, BCRYPT_SALT_ROUNDS).then(async (hashsedPassword) => {
        const res = await this.user.findByIdAndUpdate(id, _user);
        response.send(res);
      });
    } catch (error) {
      response.send(error);
    }
  };

  private deleteUser = async (request: Request, response: Response) => {
    try {
      const id = request.params.id;
      const res = await this.user.deleteOne({ _id: id });
      response.send(res);
    } catch (error) {
      response.send(error);
    }
  };

  private deleteUserByName = async (request: Request, response: Response) => {
    if (!request.headers.authorization) response.sendStatus(403);
    try {
      const res = await this.user.deleteOne({ username: request.params.username });
      response.send(res);
    } catch (error) {
      response.send(error);
    }
  };
}

export default UserController;
