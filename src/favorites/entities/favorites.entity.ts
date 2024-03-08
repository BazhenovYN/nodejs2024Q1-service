import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'album/entities';
import { Artist } from 'artist/entities';
import { Track } from 'track/entities';

export class Favorites {
  @ApiProperty({ type: [Artist] })
  artists: Artist[];

  @ApiProperty({ type: [Album] })
  albums: Album[];

  @ApiProperty({ type: [Track] })
  tracks: Track[];
}
