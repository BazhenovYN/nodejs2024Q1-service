import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import type { AppConfigType } from 'config';
import { DatabaseService } from 'database/database.service';
import { CreateUserDto, UpdatePasswordDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private db: DatabaseService,
    private config: ConfigService<AppConfigType, true>,
  ) {}

  private async hashPassword(password: string) {
    const salt = this.config.get('salt', { infer: true });
    return bcrypt.hash(password, salt);
  }

  async create(dto: CreateUserDto) {
    const hash = await this.hashPassword(dto.password);
    return this.db.users.create({
      ...dto,
      password: hash,
    });
  }

  findAll() {
    return this.db.users.findAll();
  }

  findOne(id: string) {
    const user = this.db.users.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updatePassword(id: string, dto: UpdatePasswordDto) {
    if (dto.newPassword === dto.oldPassword) {
      throw new BadRequestException('The new password matches the old password');
    }

    const user = this.db.users.findOne(id);
    const match = await bcrypt.compare(dto.oldPassword, user.password);
    if (!match) {
      throw new ForbiddenException('Old password incorrect');
    }

    const hash = await this.hashPassword(dto.newPassword);

    return this.db.users.update(id, { password: hash });
  }

  remove(id: string) {
    return this.db.users.remove(id);
  }
}
