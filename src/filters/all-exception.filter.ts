import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

const DEFAULT_ERROR_MESSAGE = 'Internal server error';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('Exceptions');

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  private saveErrorToLogs(exception: unknown) {
    if (exception instanceof HttpException) {
      return;
    }

    let message;
    let stack;

    if (exception instanceof Error) {
      message = exception.message;
      stack = exception.stack;
    } else {
      message = `${exception}`;
    }
    this.logger.error(message, stack);
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof HttpException ? exception.message : DEFAULT_ERROR_MESSAGE;

    const responseBody = {
      statusCode: httpStatus,
      message,
      timestamp: new Date().toISOString(),
    };

    this.saveErrorToLogs(exception);

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
