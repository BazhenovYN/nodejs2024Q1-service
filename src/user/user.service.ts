import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './dto';

@Injectable()
export class UserService {
  create(dto: CreateUserDto) {
    return { dto };
  }

  findAll() {
    return 'getUsers';
  }

  findOne(userId: string) {
    return { userId };
  }

  updatePassword(userId: string, dto: UpdatePasswordDto) {
    return { userId, dto };
  }

  remove(userId: string) {
    return { userId };
  }
}
