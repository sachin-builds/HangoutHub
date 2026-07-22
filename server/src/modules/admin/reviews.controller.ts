import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

import { ReviewsService } from './reviews.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('admin/reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
  ) {}

  @Get()
  findAll(
    @Query('search') search?: string,
  ) {
    return this.reviewsService.findAll(search);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.reviewsService.remove(id);
  }
}