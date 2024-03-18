import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfigType } from 'config';

const getLogLevels = (level: number): LogLevel[] => {
  switch (level) {
    case 1:
      return ['debug'];
    case 2:
      return ['log'];
    case 3:
      return ['warn'];
    case 4:
      return ['error'];
    case 5:
      return ['fatal'];
    default:
      return ['verbose'];
  }
};

@Injectable()
export class LoggerService extends ConsoleLogger {
  constructor(config: ConfigService<AppConfigType, true>) {
    super();

    const level = config.get('logLevel', { infer: true });
    super.setLogLevels(getLogLevels(level));
  }

  log(message: any, context?: string) {
    // write the message to a file
    super.log(message, context);
  }

  fatal(message: any, context?: string) {
    // write the message to a file
    super.fatal(message, context);
  }

  error(message: any, stack?: string, context?: string) {
    // write the message to a file
    super.error(message, stack, context);
  }

  warn(message: any, context?: string) {
    // write the message to a file
    super.warn(message, context);
  }

  debug(message: any, context?: string) {
    // write the message to a file
    super.debug(message, context);
  }

  verbose(message: any, context?: string) {
    // write the message to a file
    super.verbose(message, context);
  }
}
