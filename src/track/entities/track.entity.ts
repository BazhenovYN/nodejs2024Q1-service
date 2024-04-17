import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

export class Track {
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

    this.id = uuidv4();
  }
}
