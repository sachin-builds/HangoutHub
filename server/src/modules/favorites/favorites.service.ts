import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: string,
    createFavoriteDto: CreateFavoriteDto,
  ) {
    const { cafeId } = createFavoriteDto;

    const existingFavorite =
      await this.prisma.favorite.findUnique({
        where: {
          userId_cafeId: {
            userId,
            cafeId,
          },
        },
      });

    if (existingFavorite) {
      throw new ConflictException(
        'Cafe already in favorites',
      );
    }

    return this.prisma.favorite.create({
      data: {
        userId,
        cafeId,
      },
      include: {
        cafe: true,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.favorite.findMany({
      where: {
        userId,
      },
      include: {
        cafe: {
          include: {
            reviews: true,
            vibes: {
              include: {
                vibe: true,
              },
            },
          },
        },
      },
    });
  }

  async remove(
    userId: string,
    cafeId: string,
  ) {
    const favorite =
      await this.prisma.favorite.findUnique({
        where: {
          userId_cafeId: {
            userId,
            cafeId,
          },
        },
      });

    if (!favorite) {
      throw new NotFoundException(
        'Favorite not found',
      );
    }

    await this.prisma.favorite.delete({
      where: {
        userId_cafeId: {
          userId,
          cafeId,
        },
      },
    });

    return {
      message: 'Removed from favorites',
    };
  }
}