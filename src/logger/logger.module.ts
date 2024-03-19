import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { FsService } from './fs/fs.service';

@Module({
  providers: [LoggerService, FsService],
  exports: [LoggerService],
})
export class LoggerModule {}
