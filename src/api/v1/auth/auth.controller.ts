import {Router, Request, Response} from 'express'
import Controller from '../../../interfaces/controller.interface'
import userModel from '../users/user.model'
import IUser from '../users/user.interface'
import key from '../../../key'
import jwt from 'jsonwebtoken'

class AuthController implements Controller{
  public path = '/api/v1/auth'
  public router = Router()
  private user = userModel

  constructor(){
    this.initializeRouters()
  }

  private initializeRouters(){
    this.router.post(this.path, this.login)
  }

  private login = async (request:Request, response:Response) => {
    const username = request.body.username
    const password = request.body.password
    const result:any = await this.user.findOne({username:username, password:password})
    if(!result) response.sendStatus(404)
    const user: IUser = result
    const tokenData = {
      username: user.username,
      role: user.role,
      date: new Date()
    }
    const token = jwt.sign(tokenData, key.tokenKey, {
      expiresIn: 60*60*24
    })
    response.send(token)
  }
}

export default AuthController