import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesStorageService {
  private artists = new Set<string>();
  private albums = new Set<string>();
  private tracks = new Set<string>();

  findAll() {
    return {
      artists: [...this.artists.values()],
      albums: [...this.albums.values()],
      tracks: [...this.tracks.values()],
    };
  }

  addArtist(artistId: string) {
    this.artists.add(artistId);
  }

  addAlbum(albumId: string) {
    this.albums.add(albumId);
  }

  addTrack(trackId: string) {
    this.tracks.add(trackId);
  }

  deleteArtist(artistId: string) {
    this.artists.delete(artistId);
  }

  deleteAlbum(albumId: string) {
    this.albums.delete(albumId);
  }

  deleteTrack(trackId: string) {
    this.tracks.delete(trackId);
  }
}
