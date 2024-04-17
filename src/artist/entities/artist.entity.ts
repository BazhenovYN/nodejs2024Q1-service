import { ApiProperty } from '@nestjs/swagger';
import { Artist as ArtistModel } from '@prisma/client';

export class Artist implements ArtistModel {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Freddie Mercury' })
  name: string;

  @ApiProperty()
  grammy: boolean;

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
