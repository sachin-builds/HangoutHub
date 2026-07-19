import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RecommendationDto } from './dto/recommendation.dto';

@Injectable()
export class RecommendationsService {
  constructor(private prisma: PrismaService) {}

  async recommend(dto: RecommendationDto) {
    const cafes = await this.prisma.cafe.findMany({
      include: {
        reviews: true,
        vibes: {
          include: {
            vibe: true,
          },
        },
      },
    });

    const ranked = cafes.map((cafe) => {
      let score = 0;

      // Price Match
      if (
        dto.priceRange &&
        cafe.priceRange === dto.priceRange
      ) {
        score += 30;
      }

      // Average Rating
      if (cafe.reviews.length > 0) {
        const avg =
          cafe.reviews.reduce(
            (sum, review) => sum + review.rating,
            0,
          ) / cafe.reviews.length;

        score += avg * 10;
      }

      // Purpose / Vibe
      if (dto.purpose) {
        const matched = cafe.vibes.some((v) =>
          v.vibe.name
            .toLowerCase()
            .includes(dto.purpose!.toLowerCase()),
        );

        if (matched) score += 40;
      }

      return {
        ...cafe,
        score,
      };
    });

    ranked.sort((a, b) => b.score - a.score);

    return ranked;
  }
}