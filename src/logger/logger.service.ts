import { ConsoleLogger, ConsoleLoggerOptions, Injectable, LogLevel } from '@nestjs/common';
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
  constructor(
    context: string,
    options: ConsoleLoggerOptions,
    config: ConfigService<AppConfigType, true>,
  ) {
    const level = config.get('logLevel', { infer: true });

    super(context, {
      ...options,
      logLevels: getLogLevels(level),
    });
  }

  log(message: any, context?: string) {
    super.log.apply(this, [message, context]);
    // write the message to a file
  }

  fatal(message: any, context?: string) {
    super.fatal.apply(this, [message, context]);
    // write the message to a file
  }

  error(message: any, stack?: string, context?: string) {
    super.error.apply(this, [message, stack, context]);
    // write the message to a file
  }

  warn(message: any, context?: string) {
    super.warn.apply(this, [message, context]);
    // write the message to a file
  }

  debug(message: any, context?: string) {
    super.debug.apply(this, [message, context]);
    // write the message to a file
  }

  verbose(message: any, context?: string) {
    super.verbose.apply(this, [message, context]);
    // write the message to a file
  }
}
