import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { User } from 'user/entities';
import { AuthService } from './auth.service';
import { Public } from './decorators';
import { AuthDto } from './dto';
import { LocalAuthGuard } from './guards';
import { RequestWithUser } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiTags('Signup')
  @ApiOperation({ summary: 'Signup', description: 'Signup a user' })
  @ApiCreatedResponse({ description: 'Successful signup' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Post('signup')
  async signup(@Body() dto: AuthDto) {
    const user = await this.authService.signup(dto);
    return new User(user);
  }

  @Public()
  @ApiTags('Login')
  @ApiOperation({ summary: 'Login', description: 'Logins a user and returns a JWT-token' })
  @ApiBody({ type: AuthDto })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Successful login' })
  @ApiForbiddenResponse({ description: 'Incorrect login or password' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser) {
    return this.authService.login(request.user);
  }
}
