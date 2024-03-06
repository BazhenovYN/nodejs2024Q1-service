import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'database/database.service';
import { CreateArtistDto, UpdateArtistDto } from './dto';

@Injectable()
export class ArtistService {
  constructor(private db: DatabaseService) {}

  create(dto: CreateArtistDto) {
    return this.db.artists.create(dto);
  }

  findAll() {
    return this.db.artists.findAll();
  }

  findOne(id: string) {
    return this.db.artists.findOne(id);
  }

  update(id: string, dto: UpdateArtistDto) {
    return this.db.artists.update(id, dto);
  }

  remove(id: string) {
    return this.db.artists.remove(id);
  }
}
