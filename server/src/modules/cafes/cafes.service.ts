import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { SearchCafeDto } from './dto/search-cafe.dto';
import { CreateCafeDto } from './dto/create-cafe.dto';
import { UpdateCafeDto } from './dto/update-cafe.dto';

@Injectable()
export class CafesService {
  constructor(private prisma: PrismaService) {}

  async findAll(searchDto: SearchCafeDto) {
    const { city, priceRange } = searchDto;

    const where: any = {};

    if (city) {
      where.city = {
        contains: city,
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
    });
  }

  async findOne(id: string) {
    const cafe = await this.prisma.cafe.findUnique({
      where: { id },
      include: {
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        favorites: true,
        vibes: {
          include: {
            vibe: true,
          },
        },
      },
    });

    if (!cafe) {
      throw new NotFoundException('Cafe not found');
    }

    return cafe;
  }

  async create(createCafeDto: CreateCafeDto) {
    return this.prisma.cafe.create({
      data: createCafeDto,
    });
  }

  async update(
    id: string,
    updateCafeDto: UpdateCafeDto,
  ) {
    await this.findOne(id);

    return this.prisma.cafe.update({
      where: { id },
      data: updateCafeDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.cafe.delete({
      where: { id },
    });
  }
}