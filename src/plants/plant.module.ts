import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plant } from 'src/plants/entities/plant.entity';
import { PlantsController } from './plant.controller';
import { PlantService } from './plant.service';
import { PetToxicity } from 'src/plants/entities/pet-toxicity.entity';
import { MissingPlantModule } from 'src/missing-plants/missing-plant.module';

@Module({
  imports: 
  [TypeOrmModule.forFeature([Plant, PetToxicity]),
  MissingPlantModule,
],
  controllers: [PlantsController],
  providers: [PlantService],
  exports: [TypeOrmModule]
})
export class PlantsModule {}
