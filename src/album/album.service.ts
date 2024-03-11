import { Injectable, NotFoundException } from '@nestjs/common';

import { DatabaseService } from 'database/database.service';
import { CreateAlbumDto, UpdateAlbumDto } from './dto';

@Injectable()
export class AlbumService {
  constructor(private db: DatabaseService) {}

  private clearAlbumInTracks(albumId: string) {
    const tracks = this.db.tracks.findByAlbumId(albumId);
    tracks.forEach((track) => this.db.tracks.update(track.id, { albumId: null }));
  }

  private clearFavorites(albumId: string) {
    const album = this.db.albums.findOneOrThrow(albumId);
    this.db.favorites.deleteAlbum(album.id);
  }

  create(dto: CreateAlbumDto) {
    return this.db.albums.create(dto);
  }

  findAll() {
    return this.db.albums.findAll();
  }

  findOne(id: string) {
    const album = this.db.albums.findOneOrThrow(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  update(id: string, dto: UpdateAlbumDto) {
    return this.db.albums.update(id, dto);
  }

  remove(id: string) {
    this.clearAlbumInTracks(id);
    this.clearFavorites(id);
    return this.db.albums.remove(id);
  }
}
