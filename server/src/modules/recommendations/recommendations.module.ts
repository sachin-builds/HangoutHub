import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RecommendationsController } from './recommendations.controller';
import { RecommendationsService } from './recommendations.service';

import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule,
  ],
  controllers: [RecommendationsController],
  providers: [RecommendationsService],
})
export class RecommendationsModule {}