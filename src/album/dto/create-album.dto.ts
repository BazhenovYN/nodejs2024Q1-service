import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({ example: 'Mutter', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 2001, required: true })
  @IsNotEmpty()
  @IsInt()
  year: number;

  @ApiPropertyOptional({ example: '8515dd62-859f-444b-a628-f4e7c6954f57', required: true })
  @IsUUID()
  @IsOptional()
  artistId: string | null;
}
