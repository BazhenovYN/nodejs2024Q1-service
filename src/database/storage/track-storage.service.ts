import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTrackDto, UpdateTrackDto } from 'track/dto';
import { Track } from 'track/entities';

@Injectable()
export class TrackStorageService {
  private tracks = new Map<string, Track>();

  create(dto: CreateTrackDto): Track {
    const track = new Track(dto);
    this.tracks.set(track.id, track);
    return track;
  }

  findAll(): Track[] {
    return [...this.tracks.values()];
  }

  findOne(id: string): Track | null {
    return this.tracks.get(id) ?? null;
  }

  findOneOrThrow(id: string): Track {
    const track = this.findOne(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  findByArtistId(artistId: string): Track[] {
    return this.findAll().filter((track) => track.artistId === artistId);
  }

  findByAlbumId(albumId: string): Track[] {
    return this.findAll().filter((track) => track.albumId === albumId);
  }

  update(id: string, dto: UpdateTrackDto): Track {
    const track = this.findOneOrThrow(id);

    Object.assign(track, dto);

    return track;
  }

  remove(id: string): void {
    const track = this.findOneOrThrow(id);
    this.tracks.delete(track.id);
  }
}
