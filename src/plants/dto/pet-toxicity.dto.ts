// src/dto/update-plant.dto.ts
import { IsString, IsOptional, MaxLength, IsEnum, IsUrl, IsInt, Min, Max, IsNotEmpty  } from 'class-validator';

export class PetToxicDto {
  @IsNotEmpty()
  @IsEnum(['cat', 'dog'])
  petType: 'cat' | 'dog';

  @IsNotEmpty()
  @IsEnum(['00', '10', '20', '30', '40'])
  toxicLevel: '00' | '10' | '20' | '30' | '40'; // 위험 레벨

  @IsOptional()
  @IsString()
  @MaxLength(255)
  msg?: string;
  
  @IsOptional()
  plantId?: number; // 식물 ID (해로운 영향을 추가하는 식물 ID)
}


export class CreateToxicDto {
  @IsEnum(['cat', 'dog'])
  petType: 'cat' | 'dog'; // 동물 타입

  @IsEnum(['00', '10', '20', '30', '40'])
  toxicLevel: '00' | '10' | '20' | '30' | '40'; // 위험 레벨

  @IsString()
  @MaxLength(255)
  msg: string; // 메시지

  @IsOptional()
  plantId?: number; // 식물 ID (해로운 영향을 추가하는 식물 ID)
}


export class UpdateToxicDto {
  @IsEnum(['00', '10', '20', '30', '40'])
  toxicLevel: '00' | '10' | '20' | '30' | '40'; // 위험 레벨

  @IsString()
  @MaxLength(300)
  msg: string; // 메시지
}