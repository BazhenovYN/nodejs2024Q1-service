import { Global, Module } from '@nestjs/common';

import { DatabaseService } from './database.service';
import {
  AlbumStorageService,
  ArtistStorageService,
  FavoritesStorageService,
  TrackStorageService,
  UserStorageService,
} from './storage';

@Global()
@Module({
  imports: [],
  providers: [
    DatabaseService,
    UserStorageService,
    ArtistStorageService,
    TrackStorageService,
    AlbumStorageService,
    FavoritesStorageService,
  ],
  exports: [DatabaseService],
})
export class DatabaseModule {}
