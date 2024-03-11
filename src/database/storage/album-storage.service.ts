import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateAlbumDto, UpdateAlbumDto } from 'album/dto';
import { Album } from 'album/entities';

@Injectable()
export class AlbumStorageService {
  private albums = new Map<string, Album>();

  create(dto: CreateAlbumDto): Album {
    const album = new Album(dto);
    this.albums.set(album.id, album);
    return album;
  }

  findAll(): Album[] {
    return [...this.albums.values()];
  }

  findMany(ids: string[]): Album[] {
    return ids.map((id) => this.findOne(id)).filter((album): album is Album => album !== null);
  }

  findOne(id: string): Album | null {
    return this.albums.get(id) ?? null;
  }

  findOneOrThrow(id: string): Album {
    const album = this.findOne(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  findByArtistId(artistId: string) {
    return this.findAll().filter((album) => album.artistId === artistId);
  }

  update(id: string, dto: UpdateAlbumDto): Album | null {
    const album = this.findOneOrThrow(id);

    Object.assign(album, dto);

    return album;
  }

  remove(id: string): boolean {
    const album = this.findOneOrThrow(id);

    this.albums.delete(album.id);

    return true;
  }
}
