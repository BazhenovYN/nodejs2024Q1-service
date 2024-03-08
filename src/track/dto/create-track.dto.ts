import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({ example: 'The show must go on' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: '0a35dd62-e09f-444b-a628-f4e7c6954f57' })
  @IsUUID()
  @IsOptional()
  artistId: string | null;

  @ApiPropertyOptional({ example: '8835d462-e09f-444b-a628-f4e7c6954125' })
  @IsUUID()
  @IsOptional()
  albumId: string | null;

  @ApiProperty({ description: 'In seconds', example: 271 })
  @IsInt()
  @IsNotEmpty()
  duration: number;
}
