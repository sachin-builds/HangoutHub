import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PriceRange } from '@prisma/client';

export class SearchCafeDto {
  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsEnum(PriceRange)
  priceRange?: PriceRange;
}