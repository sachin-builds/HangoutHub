import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: string,
    createReviewDto: CreateReviewDto,
  ) {
    const { cafeId, rating, comment } = createReviewDto;

    return this.prisma.review.create({
      data: {
        rating,
        comment,
        cafeId,
        userId,
      },
      include: {
        user: true,
        cafe: true,
      },
    });
  }

  async findAll() {
    return this.prisma.review.findMany({
      include: {
        user: true,
        cafe: true,
      },
    });
  }

  async findOne(id: string) {
    const review = await this.prisma.review.findUnique({
      where: { id },
      include: {
        user: true,
        cafe: true,
      },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  async update(
    id: string,
    updateReviewDto: UpdateReviewDto,
  ) {
    return this.prisma.review.update({
      where: { id },
      data: updateReviewDto,
      include: {
        user: true,
        cafe: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.review.delete({
      where: { id },
    });
  }

  async getCafeReviews(cafeId: string) {
    return this.prisma.review.findMany({
      where: {
        cafeId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getAverageRating(cafeId: string) {
    const result = await this.prisma.review.aggregate({
      where: {
        cafeId,
      },
      _avg: {
        rating: true,
      },
      _count: {
        rating: true,
      },
    });

    return {
      averageRating: result._avg.rating ?? 0,
      totalReviews: result._count.rating,
    };
  }
}