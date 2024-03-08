import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({ example: 'The show must go on' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ type: String, format: 'uuid' })
  @IsUUID()
  @IsOptional()
  artistId: string | null;

  @ApiPropertyOptional({ type: String, format: 'uuid' })
  @IsUUID()
  @IsOptional()
  albumId: string | null;

  @ApiProperty({ description: 'In seconds', example: 271 })
  @IsInt()
  @IsNotEmpty()
  duration: number;
}
