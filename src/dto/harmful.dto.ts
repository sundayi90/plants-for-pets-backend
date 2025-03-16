// src/dto/update-plant.dto.ts
import { IsString, IsOptional, MaxLength, IsEnum, IsUrl, IsInt, Min, Max  } from 'class-validator';

export class CreateHarmfulDto {
  @IsEnum(['cat', 'dog'])
  animalType: 'cat' | 'dog'; // 동물 타입

  @IsEnum(['00', '10', '20', '30', '40'])
  harmfulLevel: '00' | '10' | '20' | '30' | '40'; // 위험 레벨

  @IsString()
  @MaxLength(300)
  msg: string; // 메시지

  @IsOptional()
  plantId?: number; // 식물 ID (해로운 영향을 추가하는 식물 ID)
}


export class UpdateHarmfulDto {
  @IsEnum(['00', '10', '20', '30', '40'])
  harmfulLevel: '00' | '10' | '20' | '30' | '40'; // 위험 레벨

  @IsString()
  @MaxLength(300)
  msg: string; // 메시지
}