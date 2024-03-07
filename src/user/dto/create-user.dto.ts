import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', required: true })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ example: '123456', required: true })
  @IsString()
  @IsNotEmpty()
  password: string;
}
