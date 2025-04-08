import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateMissingPlantDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  searchTerm: string;
}
