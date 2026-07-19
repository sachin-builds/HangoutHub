import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { FavoritesService } from './favorites.service';

import { CreateFavoriteDto } from './dto/create-favorite.dto';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @GetUser('id') userId: string,
    @Body() createFavoriteDto: CreateFavoriteDto,
  ) {
    return this.favoritesService.create(
      userId,
      createFavoriteDto,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@GetUser('id') userId: string) {
    return this.favoritesService.findAll(userId);
  }

  @Delete(':cafeId')
  @HttpCode(HttpStatus.OK)
  remove(
    @GetUser('id') userId: string,
    @Param('cafeId') cafeId: string,
  ) {
    return this.favoritesService.remove(
      userId,
      cafeId,
    );
  }
}