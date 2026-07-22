import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

@Module({
  imports: [PrismaModule],

  controllers: [
    AdminController,
    UsersController,
    ReviewsController,
  ],

  providers: [
    AdminService,
    UsersService,
    ReviewsService,
  ],
})
export class AdminModule {}