import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'prisma/prisma.service';
import { CreateTrackDto, UpdateTrackDto } from './dto';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateTrackDto) {
    return this.prisma.track.create({
      data: {
        ...dto,
      },
    });
  }

  findAll() {
    return this.prisma.track.findMany();
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  async update(id: string, dto: UpdateTrackDto) {
    const track = await this.findOne(id);
    return this.prisma.track.update({
      where: {
        id: track.id,
      },
      data: {
        ...dto,
      },
    });
  }

  async remove(id: string) {
    const track = await this.findOne(id);
    return this.prisma.track.delete({
      where: {
        id: track.id,
      },
    });
  }
}
