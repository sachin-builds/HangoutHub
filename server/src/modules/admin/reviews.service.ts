import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async findAll(search?: string) {
    return this.prisma.review.findMany({
      where: search
        ? {
            OR: [
              {
                comment: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                user: {
                  name: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              },
              {
                cafe: {
                  name: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              },
            ],
          }
        : {},

      include: {
        user: true,
        cafe: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async remove(id: string) {
    return this.prisma.review.delete({
      where: {
        id,
      },
    });
  }
}