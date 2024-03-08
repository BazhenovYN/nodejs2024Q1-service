import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

export class User {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty()
  login: string;

  @Exclude()
  password: string;

  @ApiProperty()
  version: number;

  @ApiProperty()
  createdAt: number;

  @ApiProperty()
  updatedAt: number;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);

    this.id = uuidv4();
    this.version = 1;
    this.createdAt = new Date().getTime();
    this.updatedAt = this.createdAt;
  }
}
