import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

import type { AppConfigType } from 'config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService<AppConfigType, true>) {
    super({
      datasources: {
        db: {
          url: config.get('databaseUrl', { infer: true }),
        },
      },
    });
  }
}
