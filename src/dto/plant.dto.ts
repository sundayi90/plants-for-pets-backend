// src/dto/create-plant.dto.ts
import { Type } from 'class-transformer';
import { IsString, IsOptional, MaxLength, IsUrl, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { PetToxicDto } from './pet-toxicity.dto';

export class CreatePlantDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  engName: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  desc?: string;

  @IsNotEmpty()
  @IsString()
  species: string;

  @IsOptional() // 이미지 URL은 선택사항
  @IsUrl()
  img?: string; // 이미지 URL (선택적)

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PetToxicDto)
  petToxicities: PetToxicDto[];
}

export class UpdatePlantDto extends PartialType(CreatePlantDto) {}