import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateCafeDto } from './dto/create-cafe.dto';
import { UpdateCafeDto } from './dto/update-cafe.dto';

@Injectable()
export class CafesService {
  constructor(private prisma: PrismaService) {}

  async create(createCafeDto: CreateCafeDto) {
    return this.prisma.cafe.create({
      data: createCafeDto,
    });
  }

  async findAll() {
    return this.prisma.cafe.findMany({
      include: {
        reviews: true,
        favorites: true,
        vibes: {
          include: {
            vibe: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.cafe.findUnique({
      where: { id },
      include: {
        reviews: true,
        favorites: true,
        vibes: {
          include: {
            vibe: true,
          },
        },
      },
    });
  }

  async update(id: string, updateCafeDto: UpdateCafeDto) {
    return this.prisma.cafe.update({
      where: { id },
      data: updateCafeDto,
    });
  }

  async remove(id: string) {
    return this.prisma.cafe.delete({
      where: { id },
    });
  }
}