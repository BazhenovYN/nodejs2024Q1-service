import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { AppConfigType } from 'config';
import { UserService } from 'user/user.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private config: ConfigService<AppConfigType, true>,
  ) {}

  async signup(dto: AuthDto) {
    return this.userService.create(dto);
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
