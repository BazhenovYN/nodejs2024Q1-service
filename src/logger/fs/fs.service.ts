import { Injectable, LogLevel, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WriteStream, createWriteStream } from 'node:fs';
import { access, mkdir } from 'node:fs/promises';
import * as path from 'node:path';

import type { AppConfigType } from 'config';

interface Log {
  prefix: string;
  levels: LogLevel[];
  file: WriteStream | null;
}

@Injectable()
export class FsService implements OnModuleInit {
  private logDir: string;
  private maxFileSize: number;
  private logs: Log[];

  constructor(config: ConfigService<AppConfigType, true>) {
    this.maxFileSize = config.get('maxLogFileSizeBytes', { infer: true });
    this.logDir = config.get('logDir', { infer: true });
    this.initLogs();
  }

  private initLogs(): void {
    this.logs = [
      {
        prefix: 'error',
        levels: ['error'],
        file: null,
      },
      {
        prefix: 'common',
        levels: ['debug', 'log', 'warn', 'fatal', 'verbose'],
        file: null,
      },
    ];
  }

  private generateFileName(dir: string, prefix: string): string {
    const timestamp = new Date().getTime();
    return path.resolve(dir, `${prefix}_logs_${timestamp}.log`);
  }

  private createNewLogFile(prefix: string) {
    const filename = this.generateFileName(this.logDir, prefix);
    const stream = createWriteStream(filename, { flags: 'a' });
    return stream;
  }

  private getLogsByLevel(level: LogLevel): Log[] {
    return this.logs.filter((log) => log.levels.includes(level));
  }

  private generateLogRecord(level: string, message: string, context: string): string {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      level: level.toUpperCase(),
      context,
      message,
    });
  }

  private writeToLog(log: Log, level: LogLevel, message: string, context: string) {
    if (!log.file) {
      log.file = this.createNewLogFile(log.prefix);
    }

    const record = this.generateLogRecord(level, message, context);
    log.file.write(`${record}\n`);

    if (log.file.bytesWritten >= this.maxFileSize) {
      log.file.end();
      log.file = this.createNewLogFile(log.prefix);
    }
  }

  writeToFile(level: LogLevel, message: string, context = '') {
    const logs = this.getLogsByLevel(level);
    for (const log of logs) {
      this.writeToLog(log, level, message, context);
    }
  }

  async onModuleInit() {
    await this.ensureLogDirectoryExists();
  }

  async ensureLogDirectoryExists() {
    try {
      await access(this.logDir);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await mkdir(this.logDir, { recursive: true });
      } else {
        throw error;
      }
    }
  }
}
