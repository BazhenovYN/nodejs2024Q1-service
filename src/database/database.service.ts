import { Injectable } from '@nestjs/common';
import {
  AlbumStorageService,
  ArtistStorageService,
  FavoritesStorageService,
  TrackStorageService,
  UserStorageService,
} from './storage';

@Injectable()
export class DatabaseService {
  constructor(
    private readonly userStorage: UserStorageService,
    private readonly artistStorage: ArtistStorageService,
    private readonly trackStorage: TrackStorageService,
    private readonly albumStorage: AlbumStorageService,
    private readonly favoritesStorage: FavoritesStorageService,
  ) {}

  get users() {
    return this.userStorage;
  }

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
