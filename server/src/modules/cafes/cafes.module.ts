import { Module } from '@nestjs/common';

import { CafesController } from './cafes.controller';
import { CafesService } from './cafes.service';

import { PrismaService } from '../../prisma/prisma.service';

import { CloudinaryModule } from '../../cloudinary/cloudinary.module';

@Module({
  imports: [
    CloudinaryModule,
  ],

  controllers: [CafesController],

  providers: [
    CafesService,
  ],
})
export class CafesModule {}