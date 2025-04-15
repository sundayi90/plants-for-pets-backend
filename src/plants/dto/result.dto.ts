import { IsString, IsOptional, MaxLength, IsUrl, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';

// result: string, msg: string, missing?: string
export class ResultDto {
  @IsNotEmpty()
  @IsString()
  result: string;

  @IsNotEmpty()
  @IsString()
  msg: string;

  @IsOptional() 
  @IsString()
  missing?: string; 
}