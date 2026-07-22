import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Inject,
  BadRequestException,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { v2 as Cloudinary } from 'cloudinary';

import { CafesService } from './cafes.service';

import { SearchCafeDto } from './dto/search-cafe.dto';
import { CreateCafeDto } from './dto/create-cafe.dto';
import { UpdateCafeDto } from './dto/update-cafe.dto';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('cafes')
export class CafesController {
  constructor(
    private readonly cafesService: CafesService,

    @Inject('CLOUDINARY')
    private cloudinary: typeof Cloudinary,
  ) {}

  @Get()
  findAll(@Query() searchDto: SearchCafeDto) {
    return this.cafesService.findAll(searchDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cafesService.findOne(id);
  }

  @Post('upload')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file: any,
  ) {
    console.log('========== FILE ==========');
    console.log(file);

    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    return new Promise((resolve, reject) => {
      const stream = this.cloudinary.uploader.upload_stream(
        {
          folder: 'hangouthub/cafes',
        },
        (error, result) => {
          console.log('========== CLOUDINARY RESULT ==========');
          console.log(result);

          console.log('========== CLOUDINARY ERROR ==========');
          console.log(error);

          if (error) {
            return reject(error);
          }

          resolve({
            imageUrl: result?.secure_url,
          });
        },
      );

      stream.end(file.buffer);
    });
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  create(@Body() createCafeDto: CreateCafeDto) {
    return this.cafesService.create(createCafeDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  update(
    @Param('id') id: string,
    @Body() updateCafeDto: UpdateCafeDto,
  ) {
    return this.cafesService.update(id, updateCafeDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.cafesService.remove(id);
  }
}