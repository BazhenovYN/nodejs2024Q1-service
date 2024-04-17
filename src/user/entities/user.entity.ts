import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

export class User {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'TestUser' })
  login: string;

  @Exclude()
  password: string;

  @ApiProperty({ example: 1 })
  version: number;

  @ApiProperty({ example: 1709931941478 })
  createdAt: number;

  @ApiProperty({ example: 1709932741613 })
  updatedAt: number;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);

    this.id = uuidv4();
    this.version = 1;
    this.createdAt = new Date().getTime();
    this.updatedAt = this.createdAt;
  }
}
