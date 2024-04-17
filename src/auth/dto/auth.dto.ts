import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class AuthDto {
  @ApiProperty({ description: 'Username', example: 'John123' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  login: string;

  @ApiProperty({ description: 'Password', example: '123456', format: 'password' })
  @Matches(/^[a-zA-Z0-9]{3,30}/)
  @IsString()
  @IsNotEmpty()
  password: string;
}
