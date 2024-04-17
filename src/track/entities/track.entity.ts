import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Track as TrackModel } from '@prisma/client';

export class Track implements TrackModel {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'The Show Must Go On' })
  name: string;

  @ApiPropertyOptional({ type: String, format: 'uuid' })
  artistId: string | null;

  @ApiPropertyOptional({ type: String, format: 'uuid' })
  albumId: string | null;

  @ApiProperty({ example: 262 })
  duration: number;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
