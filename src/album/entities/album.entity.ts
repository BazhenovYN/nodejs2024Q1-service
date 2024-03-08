import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

export class Album {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Innuendo' })
  name: string;

  @ApiProperty({ example: 1991 })
  year: number;

  @ApiPropertyOptional({ type: String, format: 'uuid' })
  artistId: string | null;

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
    this.id = uuidv4();
  }
}
