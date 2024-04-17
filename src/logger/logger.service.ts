import { ConsoleLogger, ConsoleLoggerOptions, Injectable, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppConfigType } from 'config';
import { FsService } from './fs/fs.service';

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
    private fs: FsService,
  ) {
    const level = config.get('logLevel', { infer: true });

    super(context, {
      ...options,
      logLevels: getLogLevels(level),
    });
  }

  log(message: any, context?: string) {
    super.log.apply(this, [message, context]);
    this.fs.writeToFile('log', message, context);
  }

  fatal(message: any, context?: string) {
    super.fatal.apply(this, [message, context]);
    this.fs.writeToFile('fatal', message, context);
  }

  error(message: any, stack?: string, context?: string) {
    super.error.apply(this, [message, stack, context]);
    this.fs.writeToFile('error', message, context);
  }

  warn(message: any, context?: string) {
    super.warn.apply(this, [message, context]);
    this.fs.writeToFile('warn', message, context);
  }

  debug(message: any, context?: string) {
    super.debug.apply(this, [message, context]);
    this.fs.writeToFile('debug', message, context);
  }

  verbose(message: any, context?: string) {
    super.verbose.apply(this, [message, context]);
    this.fs.writeToFile('verbose', message, context);
  }
}
