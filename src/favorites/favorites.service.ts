import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

import { Album } from 'album/entities';
import { Artist } from 'artist/entities';
import { DatabaseService } from 'database/database.service';
import { Track } from 'track/entities';
import { Favorites } from './entities';

@Injectable()
export class FavoritesService {
  constructor(private db: DatabaseService) {}

  findAll(): Favorites {
    const favoritesIds = this.db.favorites.findAll();

    const artists = this.db.artists.findMany(favoritesIds.artists);
    const albums = this.db.albums.findMany(favoritesIds.albums);
    const tracks = this.db.tracks.findMany(favoritesIds.tracks);

    return {
      artists,
      albums,
      tracks,
    };
  }

  isArtistFavorite(artist: Artist) {
    const favoritesIds = this.db.favorites.findAll().artists;
    return favoritesIds.some((id) => id === artist.id);
  }

  isAlbumFavorite(album: Album) {
    const favorites = this.db.favorites.findAll().albums;
    return favorites.some((id) => id === album.id);
  }

  isTrackFavorite(track: Track) {
    const favorites = this.db.favorites.findAll().tracks;
    return favorites.some((id) => id === track.id);
  }

  addArtist(id: string) {
    const artist = this.db.artists.findOne(id);

    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }

    return this.db.favorites.addArtist(artist.id);
  }

  addAlbum(id: string) {
    const album = this.db.albums.findOne(id);

    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }

    return this.db.favorites.addAlbum(album.id);
  }

  addTrack(id: string) {
    const track = this.db.tracks.findOne(id);

    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }

    return this.db.favorites.addTrack(track.id);
  }

  deleteArtist(id: string) {
    const artist = this.db.artists.findOneOrThrow(id);

    if (!this.isArtistFavorite(artist)) {
      throw new NotFoundException('Artist is not favorite');
    }

    return this.db.favorites.deleteArtist(artist.id);
  }

  deleteAlbum(id: string) {
    const album = this.db.albums.findOneOrThrow(id);

    if (!this.isAlbumFavorite(album)) {
      throw new NotFoundException('Album is not favorite');
    }

    return this.db.favorites.deleteAlbum(album.id);
  }

  deleteTrack(id: string) {
    const track = this.db.tracks.findOneOrThrow(id);

    if (!this.isTrackFavorite(track)) {
      throw new NotFoundException('Track is not favorite');
    }

    return this.db.favorites.deleteTrack(track.id);
  }
}
