import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from 'user/dto';
import { User } from 'user/entities';

@Injectable()
export class UserStorageService {
  private users = new Map<string, User>();

  create(dto: CreateUserDto): User {
    const user = new User(dto);
    this.users.set(user.id, user);
    return user;
  }

  findAll(): User[] {
    return [...this.users.values()];
  }

  findOne(id: string): User {
    const user = this.users.get(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  update(id: string, dto: UpdateUserDto): User {
    const user = this.findOne(id);

    Object.assign(user, dto);

    user.version += 1;
    user.updatedAt = new Date().getTime();

    return user;
  }

  remove(id: string): void {
    const user = this.findOne(id);
    this.users.delete(user.id);
  }
}
