// src/dto/create-plant.dto.ts
import { IsString, IsOptional, MaxLength, IsEnum, IsUrl, IsInt, Min, Max } from 'class-validator';

export class CreatePlantDto {
  @IsString()
  @MaxLength(100)
  name: string; // 식물 이름

  @IsOptional() // eng_name은 선택사항
  @IsString()
  @MaxLength(100)
  engName?: string; // 영어 이름 (선택적)

  @IsOptional() // 설명은 선택사항
  @IsString()
  @MaxLength(300)
  desc?: string; // 설명 (선택적)

  @IsOptional() // 이미지 URL은 선택사항
  @IsUrl()
  img?: string; // 이미지 URL (선택적)
}


export class UpdatePlantDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  engName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  desc?: string;

  @IsOptional()
  @IsUrl()
  img?: string;
}
