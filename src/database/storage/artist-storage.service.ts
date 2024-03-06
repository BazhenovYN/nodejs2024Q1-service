import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateArtistDto, UpdateArtistDto } from 'artist/dto';
import { Artist } from 'artist/entities';

@Injectable()
export class ArtistStorageService {
  private artists = new Map<string, Artist>();

  create(dto: CreateArtistDto): Artist {
    const artist = new Artist(dto);
    this.artists.set(artist.id, artist);
    return artist;
  }

  findAll(): Artist[] {
    return [...this.artists.values()];
  }

  findOne(id: string): Artist {
    const artist = this.artists.get(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  update(id: string, dto: UpdateArtistDto): Artist {
    const artist = this.findOne(id);

    Object.assign(artist, dto);

    return artist;
  }

  remove(id: string): void {
    const artist = this.findOne(id);
    this.artists.delete(artist.id);
  }
}
