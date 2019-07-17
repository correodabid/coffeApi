import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import key from '../key';
import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  transports: [new transports.Console(), new transports.File({ filename: 'app.log' })],
  format: format.combine(
    format(function dynamicContent(info) {
      return info;
    })(),
    format.simple(),
  ),
});

const checkPermissions = async (request: Request, response: Response, next: NextFunction) => {
  if (!request.headers.authorization) response.end();
  try {
    const token = request.headers.authorization;
    const auth = await checkIsAdmin(String(token));
    auth === true ? next() : response.end();
  } catch (error) {
    response.end();
  }
};

const checkIsAdmin = async (token: string) => {
  const decoded: any = await jwt.verify(token, key.tokenKey);
  let result: boolean;
  decoded.role === 'admin' ? (result = true) : (result = false);
  return result;
};

export { checkPermissions, checkIsAdmin, logger };
