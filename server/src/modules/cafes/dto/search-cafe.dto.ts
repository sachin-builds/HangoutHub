import {
  IsBooleanString,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

import { PriceRange } from '@prisma/client';

export class SearchCafeDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsEnum(PriceRange)
  priceRange?: PriceRange;

  @IsOptional()
  @IsBooleanString()
  wifi?: string;

  @IsOptional()
  @IsNumberString()
  rating?: string;
}