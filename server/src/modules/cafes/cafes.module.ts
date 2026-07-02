import { Module } from '@nestjs/common';

import { CafesController } from './cafes.controller';
import { CafesService } from './cafes.service';

import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [CafesController],
  providers: [CafesService, PrismaService],
})
export class CafesModule {}