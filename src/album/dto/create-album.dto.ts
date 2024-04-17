import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({ example: 'Innuendo' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 2001 })
  @IsNotEmpty()
  @IsInt()
  year: number;

  @ApiPropertyOptional({ type: String, format: 'uuid' })
  @IsUUID()
  @IsOptional()
  artistId: string | null;
}
