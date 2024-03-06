import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { DatabaseService } from 'database/database.service';
import { CreateUserDto, UpdatePasswordDto } from './dto';

@Injectable()
export class UserService {
  constructor(private db: DatabaseService) {}

  create(dto: CreateUserDto) {
    return this.db.users.create(dto);
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

  updatePassword(id: string, dto: UpdatePasswordDto) {
    if (dto.newPassword === dto.oldPassword) {
      throw new BadRequestException('The new password matches the old password');
    }
    return this.db.users.update(id, { password: dto.newPassword });
  }

  remove(id: string) {
    return this.db.users.remove(id);
  }
}
