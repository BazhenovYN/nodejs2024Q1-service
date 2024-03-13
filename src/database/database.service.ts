import { Injectable } from '@nestjs/common';
import {
  AlbumStorageService,
  ArtistStorageService,
  FavoritesStorageService,
  TrackStorageService,
} from './storage';

@Injectable()
export class DatabaseService {
  constructor(
    private readonly artistStorage: ArtistStorageService,
    private readonly trackStorage: TrackStorageService,
    private readonly albumStorage: AlbumStorageService,
    private readonly favoritesStorage: FavoritesStorageService,
  ) {}

  get artists() {
    return this.artistStorage;
  }

  get tracks() {
    return this.trackStorage;
  }

  get albums() {
    return this.albumStorage;
  }

  get favorites() {
    return this.favoritesStorage;
  }
}
