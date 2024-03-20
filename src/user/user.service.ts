import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import type { AppConfigType } from 'config';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto, UpdatePasswordDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService<AppConfigType, true>,
  ) {}

  private async hashPassword(password: string) {
    const salt = this.config.get('salt', { infer: true });
    return bcrypt.hash(password, salt);
  }

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        login: dto.login,
      },
    });

    if (user) {
      throw new BadRequestException('The login has already been taken by another user');
    }

    const hash = await this.hashPassword(dto.password);

    return this.prisma.user.create({
      data: {
        ...dto,
        password: hash,
        version: 1,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByLogin(login: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        login,
      },
    });
    return user;
  }

  async updatePassword(id: string, dto: UpdatePasswordDto) {
    if (dto.newPassword === dto.oldPassword) {
      throw new BadRequestException('The new password matches the old password');
    }

    const user = await this.findOne(id);
    const match = await bcrypt.compare(dto.oldPassword, user.password);
    if (!match) {
      throw new ForbiddenException('Old password incorrect');
    }

    const hash = await this.hashPassword(dto.newPassword);

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: hash,
        version: {
          increment: 1,
        },
      },
    });
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.prisma.user.delete({
      where: {
        id: user.id,
      },
    });
  }

  async validateUser(login: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        login,
      },
    });

    if (!user) {
      return null;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return null;
    }

    return user;
  }
}
