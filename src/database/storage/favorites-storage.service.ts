import { Injectable } from '@nestjs/common';

import { Album } from 'album/entities';
import { Artist } from 'artist/entities';
import { Favorites } from 'favorites/entities';
import { Track } from 'track/entities';

@Injectable()
export class FavoritesStorageService {
  private artists = new Set<Artist>();
  private albums = new Set<Album>();
  private tracks = new Set<Track>();

  findAll(): Favorites {
    return {
      artists: [...this.artists.values()],
      albums: [...this.albums.values()],
      tracks: [...this.tracks.values()],
    };
  }

  addArtist(artist: Artist) {
    this.artists.add(artist);
  }

  addAlbum(album: Album) {
    this.albums.add(album);
  }

  addTrack(track: Track) {
    this.tracks.add(track);
  }

  deleteArtist(artist: Artist) {
    this.artists.delete(artist);
  }

  deleteAlbum(album: Album) {
    this.albums.delete(album);
  }

  deleteTrack(track: Track) {
    this.tracks.delete(track);
  }
}
