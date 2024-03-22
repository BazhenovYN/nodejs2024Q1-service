import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { AppConfigType } from 'config';
import { UserService } from 'user/user.service';
import { AuthDto } from './dto';
import { TokenPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private config: ConfigService<AppConfigType, true>,
  ) {}

  private getAccessToken(payload: TokenPayload) {
    const jwtSecret = this.config.get('jwtSecret', { infer: true });
    const jwtExpirationTime = `${this.config.get('jwtExpirationTime', { infer: true })}`;

    return this.jwtService.sign(payload, {
      secret: jwtSecret,
      expiresIn: jwtExpirationTime,
    });
  }

  private getRefreshToken(payload: TokenPayload) {
    const jwtSecret = this.config.get('jwtRefreshSecret', { infer: true });
    const jwtExpirationTime = `${this.config.get('jwtRefreshExpirationTime', { infer: true })}`;

    return this.jwtService.sign(payload, {
      secret: jwtSecret,
      expiresIn: jwtExpirationTime,
    });
  }

  private async getTokens(user: User) {
    const payload: TokenPayload = {
      sub: user.id,
      userId: user.id,
      login: user.login,
    };

    const accessToken = this.getAccessToken(payload);
    const refreshToken = this.getRefreshToken(payload);

    await this.userService.updateRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signup(dto: AuthDto) {
    return this.userService.create(dto);
  }

  async login(user: User) {
    return this.getTokens(user);
  }

  async refresh(user: User) {
    return this.getTokens(user);
  }

  async validateUserWithLogin(login: string, password: string) {
    const user = await this.userService.findByLogin(login);
    if (!user) {
      return null;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return null;
    }

    return user;
  }

  async validateUserWithRefreshToken(id: string, refreshToken: string) {
    const user = await this.userService.findOne(id);

    if (!user?.refreshToken) {
      return null;
    }

    const isRefreshTokenMatch = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isRefreshTokenMatch) {
      return null;
    }

    return user;
  }
}
