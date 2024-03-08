import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'database/database.service';
import { CreateArtistDto, UpdateArtistDto } from './dto';

@Injectable()
export class ArtistService {
  constructor(private db: DatabaseService) {}

  private clearArtistInTracks(artistId: string) {
    const tracks = this.db.tracks.findByArtistId(artistId);
    tracks.forEach((track) => this.db.tracks.update(track.id, { artistId: null }));
  }

  private clearArtistInAlbums(artistId: string) {
    const albums = this.db.albums.findByArtistId(artistId);
    albums.forEach((album) => this.db.albums.update(album.id, { artistId: null }));
  }

  private clearFavorites(artistId: string) {
    const artist = this.db.artists.findOneOrThrow(artistId);
    this.db.favorites.deleteArtist(artist);
  }

  create(dto: CreateArtistDto) {
    return this.db.artists.create(dto);
  }

  findAll() {
    return this.db.artists.findAll();
  }

  findOne(id: string) {
    return this.db.artists.findOneOrThrow(id);
  }

  update(id: string, dto: UpdateArtistDto) {
    return this.db.artists.update(id, dto);
  }

  remove(id: string) {
    this.clearArtistInTracks(id);
    this.clearArtistInAlbums(id);
    this.clearFavorites(id);

    return this.db.artists.remove(id);
  }
}
