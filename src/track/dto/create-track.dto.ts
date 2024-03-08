import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({ example: 'The show must go on', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '0a35dd62-e09f-444b-a628-f4e7c6954f57', required: true })
  @IsUUID()
  @IsOptional()
  artistId: string | null;

  @ApiProperty({ example: '8835d462-e09f-444b-a628-f4e7c6954125', required: true })
  @IsUUID()
  @IsOptional()
  albumId: string | null;

  @ApiProperty({ example: 271, required: true })
  @IsInt()
  @IsNotEmpty()
  duration: number;
}
