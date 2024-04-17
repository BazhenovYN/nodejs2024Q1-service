import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'database/database.service';
import { CreateTrackDto, UpdateTrackDto } from './dto';

@Injectable()
export class TrackService {
  constructor(private db: DatabaseService) {}

  private clearFavorites(trackId: string) {
    const track = this.db.tracks.findOneOrThrow(trackId);
    this.db.favorites.deleteTrack(track.id);
  }

  create(dto: CreateTrackDto) {
    return this.db.tracks.create(dto);
  }

  findAll() {
    return this.db.tracks.findAll();
  }

  findOne(id: string) {
    return this.db.tracks.findOneOrThrow(id);
  }

  update(id: string, dto: UpdateTrackDto) {
    return this.db.tracks.update(id, dto);
  }

  remove(id: string) {
    this.clearFavorites(id);
    return this.db.tracks.remove(id);
  }
}
