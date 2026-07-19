import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

import { PriceRange } from '@prisma/client';

export class RecommendationDto {
  @IsOptional()
  @IsString()
  purpose?: string;

  @IsOptional()
  @IsEnum(PriceRange)
  priceRange?: PriceRange;

  @IsOptional()
  @IsBoolean()
  wifi?: boolean;
}