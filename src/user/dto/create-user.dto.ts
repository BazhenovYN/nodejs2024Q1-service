import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: "The user's login", example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ description: "The user's password", example: '123456' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
