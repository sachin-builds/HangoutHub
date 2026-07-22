import { Body, Controller, HttpCode, HttpStatus, Post, Get } from '@nestjs/common';

import { RecommendationsService } from './recommendations.service';
import { RecommendationDto } from './dto/recommendation.dto';

@Controller('recommendations')
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService,
  ) {}

  @Get()
  async getRecommendations() {
    return this.recommendationsService.recommend(
      "Recommend cafes"
    );
  }


  @Post()
  @HttpCode(HttpStatus.OK)
  async recommend(
    @Body() dto: RecommendationDto,
  ) {
    return this.recommendationsService.recommend(dto.prompt);
  }
}