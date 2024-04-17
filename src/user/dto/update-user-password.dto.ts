import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({ description: "The user's old password", example: '123456' })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({ description: "The user's new password", example: '654321' })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
