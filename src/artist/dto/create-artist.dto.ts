import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({ example: 'John Doe', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: true, required: true })
  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
