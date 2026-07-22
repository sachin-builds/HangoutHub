import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

import { PriceRange } from '@prisma/client';

export class CreateCafeDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  address!: string;

  @IsString()
  city!: string;

  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsNumber()
  averageCost!: number;

  @IsBoolean()
  wifi!: boolean;

  @IsBoolean()
  powerSockets!: boolean;

  @IsNumber()
  noiseLevel!: number;

  @IsBoolean()
  isOpen!: boolean;

  @IsOptional()
  @IsString()
  openingTime?: string;

  @IsOptional()
  @IsString()
  closingTime?: string;

  @IsEnum(PriceRange)
  priceRange!: PriceRange;
}