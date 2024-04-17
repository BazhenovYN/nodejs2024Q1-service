import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'prisma/prisma.service';
import { CreateArtistDto, UpdateArtistDto } from './dto';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateArtistDto) {
    return this.prisma.artist.create({
      data: {
        ...dto,
      },
    });
  }

  findAll() {
    return this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  async update(id: string, dto: UpdateArtistDto) {
    const artist = await this.findOne(id);
    return this.prisma.artist.update({
      where: {
        id: artist.id,
      },
      data: {
        ...dto,
      },
    });
  }

  async remove(id: string) {
    const artist = await this.findOne(id);
    return this.prisma.artist.delete({
      where: {
        id: artist.id,
      },
    });
  }
}
