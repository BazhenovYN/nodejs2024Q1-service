import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { UserService } from 'user/user.service';
import { AuthDto } from './dto';
import { TokenPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: AuthDto) {
    return this.userService.create(dto);
  }

  async login(user: User) {
    const payload: TokenPayload = {
      sub: user.id,
      login: user.login,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(login: string, password: string) {
    const user = await this.userService.findByLogin(login);
    if (!user) {
      return null;
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      return null;
    }

    return user;
  }
}
