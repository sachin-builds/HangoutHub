import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { RecommendationsService } from './recommendations.service';
import { RecommendationDto } from './dto/recommendation.dto';

@Controller('recommendations')
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService,
  ) {}

  @Post()
  recommend(
    @Body() dto: RecommendationDto,
  ) {
    return this.recommendationsService.recommend(dto);
  }
}