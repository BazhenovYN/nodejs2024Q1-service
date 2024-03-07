import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({ example: '123456', required: true })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({ example: '654321', required: true })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
