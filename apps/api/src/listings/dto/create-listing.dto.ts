import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { ListingType } from '@prisma/client';

export class CreateListingDto {
  @IsEnum(ListingType)
  type!: ListingType;

  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  priceCents?: number;

  @IsString()
  cityId!: string;
}