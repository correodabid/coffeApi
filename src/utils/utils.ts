import jwt from 'jsonwebtoken';
import key from '../key';
import {createLogger,format,transports} from 'winston';

const logger = createLogger({
  transports: [new transports.Console()],
  format: format.combine(
    format(function dynamicContent(info, opts) {
      return info;
    })(),
    format.simple()
  )
});

logger.log('info', 'This is an information message.');

const checkIsAdmin = async (token: string) => {
  const decoded: any = await jwt.verify(token, key.tokenKey);
  let result: boolean;
  decoded.role === 'admin' ? (result = true) : (result = false);
  return result;
};

export { checkIsAdmin, logger };
