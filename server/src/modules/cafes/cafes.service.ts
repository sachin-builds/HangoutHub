import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateCafeDto } from './dto/create-cafe.dto';
import { UpdateCafeDto } from './dto/update-cafe.dto';

import { SearchCafeDto } from './dto/search-cafe.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CafesService {
  constructor(private prisma: PrismaService) {}

  async create(createCafeDto: CreateCafeDto) {
    return this.prisma.cafe.create({
      data: createCafeDto,
    });
  }

  async findAll(searchDto: SearchCafeDto) {
  const {
    search,
    address,
    priceRange,
  } = searchDto;

  const where: Prisma.CafeWhereInput = {};

  if (search) {
    where.name = {
      contains: search,
      mode: 'insensitive',
    };
  }

  if (address) {
    where.address = {
      contains: address,
      mode: 'insensitive',
    };
  }

  if (priceRange) {
    where.priceRange = priceRange;
  }

  return this.prisma.cafe.findMany({
    where,
    include: {
      reviews: true,
      favorites: true,
      vibes: {
        include: {
          vibe: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
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