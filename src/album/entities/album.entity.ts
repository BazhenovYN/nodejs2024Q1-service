import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Album as AlbumModel } from '@prisma/client';

export class Album implements AlbumModel {
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
  }
}
