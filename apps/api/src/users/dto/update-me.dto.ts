import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { Interest, Language } from '@prisma/client';

export class UpdateMeDto {
  @IsOptional()
  @IsString()
  cityId?: string;

  @IsOptional()
  @IsEnum(Language)
  language?: Language;

  @IsOptional()
  @IsArray()
  @IsEnum(Interest, { each: true })
  interests?: Interest[];
}
