import { Global, Module } from '@nestjs/common';

import { DatabaseService } from './database.service';
import { ArtistStorageService, UserStorageService } from './storage';

@Global()
@Module({
  imports: [],
  providers: [DatabaseService, UserStorageService, ArtistStorageService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
