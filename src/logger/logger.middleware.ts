import { HttpStatus, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const { method, originalUrl, query, body } = req;
      const { statusCode, statusMessage } = res;

      const message = JSON.stringify({
        method,
        originalUrl,
        query,
        body,
        statusCode,
        statusMessage,
      });

      if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
        return this.logger.error(message);
      }

      if (statusCode >= HttpStatus.BAD_REQUEST) {
        return this.logger.warn(message);
      }

      return this.logger.log(message);
    });
    next();
  }
}
