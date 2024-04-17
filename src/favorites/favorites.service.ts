import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const artists = await this.prisma.favoriteArtists.findMany({
      select: {
        artist: true,
      },
    });
    const albums = await this.prisma.favoriteAlbums.findMany({
      select: {
        album: true,
      },
    });
    const tracks = await this.prisma.favoriteTracks.findMany({
      select: {
        track: true,
      },
    });

    return {
      artists: artists.map((item) => item.artist),
      albums: albums.map((item) => item.album),
      tracks: tracks.map((item) => item.track),
    };
  }

  async addArtist(artistId: string) {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id: artistId,
      },
    });

    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }

    return this.prisma.favoriteArtists.create({
      data: {
        artistId,
      },
    });
  }

  async addAlbum(albumId: string) {
    const album = await this.prisma.album.findUnique({
      where: {
        id: albumId,
      },
    });

    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }

    return this.prisma.favoriteAlbums.create({
      data: {
        albumId,
      },
    });
  }

  async addTrack(trackId: string) {
    const track = await this.prisma.track.findUnique({
      where: {
        id: trackId,
      },
    });

    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }

    return this.prisma.favoriteTracks.create({
      data: {
        trackId,
      },
    });
  }

  async deleteArtist(artistId: string) {
    const artist = await this.prisma.favoriteArtists.findUnique({
      where: {
        artistId,
      },
    });

    if (!artist) {
      throw new NotFoundException('Artist is not favorite');
    }

    return this.prisma.favoriteArtists.delete({
      where: {
        artistId,
      },
    });
  }

  async deleteAlbum(albumId: string) {
    const album = await this.prisma.favoriteAlbums.findUnique({
      where: {
        albumId,
      },
    });

    if (!album) {
      throw new NotFoundException('Album is not favorite');
    }

    return this.prisma.favoriteAlbums.delete({
      where: {
        albumId,
      },
    });
  }

  async deleteTrack(trackId: string) {
    const track = await this.prisma.favoriteTracks.findUnique({
      where: {
        trackId,
      },
    });

    if (!track) {
      throw new NotFoundException('Track is not favorite');
    }

    return this.prisma.favoriteTracks.delete({
      where: {
        trackId,
      },
    });
  }
}
