import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';

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
  @Transform(({ value }) => value.getTime())
  createdAt: Date;

  @ApiProperty({ example: 1709932741613 })
  @Transform(({ value }) => value.getTime())
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
