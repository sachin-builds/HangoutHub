import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getStats() {
    const [
      cafes,
      users,
      reviews,
      favorites,
    ] = await Promise.all([
      this.prisma.cafe.count(),
      this.prisma.user.count(),
      this.prisma.review.count(),
      this.prisma.favorite.count(),
    ]);

    return {
      cafes,
      users,
      reviews,
      favorites,
    };
  }
}