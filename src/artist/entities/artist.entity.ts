import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

export class Artist {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  grammy: boolean;

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
    this.id = uuidv4();
  }
}
