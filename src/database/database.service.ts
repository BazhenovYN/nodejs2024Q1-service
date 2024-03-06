import { Injectable } from '@nestjs/common';
import { ArtistStorageService, UserStorageService } from './storage';

@Injectable()
export class DatabaseService {
  constructor(
    private readonly userStorage: UserStorageService,
    private readonly artistStorage: ArtistStorageService,
  ) {}

  get users() {
    return this.userStorage;
  }

  get artists() {
    return this.artistStorage;
  }
}
