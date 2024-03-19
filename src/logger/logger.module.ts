import { Module } from '@nestjs/common';

import { FsService } from './fs/fs.service';
import { LoggerService } from './logger.service';

@Module({
  providers: [LoggerService, FsService],
  exports: [LoggerService],
})
export class LoggerModule {}
