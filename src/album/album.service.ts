import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'prisma/prisma.service';
import { CreateAlbumDto, UpdateAlbumDto } from './dto';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateAlbumDto) {
    return this.prisma.album.create({
      data: {
        ...dto,
      },
    });
  }

  findAll() {
    return this.prisma.album.findMany();
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  async update(id: string, dto: UpdateAlbumDto) {
    const album = await this.findOne(id);
    return this.prisma.album.update({
      where: {
        id: album.id,
      },
      data: {
        ...dto,
      },
    });
  }

  async remove(id: string) {
    const album = await this.findOne(id);
    return this.prisma.album.delete({
      where: {
        id: album.id,
      },
    });
  }
}
