import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plant } from 'src/entities/plant.entity';
import { PlantsController } from './plants.controller';
import { PlantService } from './plant.service';
import { PetToxicity } from 'src/entities/pet-toxicity.entitiy';

@Module({
  imports: [TypeOrmModule.forFeature([Plant, PetToxicity])],
  exports: [TypeOrmModule],
  controllers: [PlantsController],
  providers: [PlantService]
})
export class PlantsModule {}
