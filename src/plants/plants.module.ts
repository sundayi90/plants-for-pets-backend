import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plant } from 'src/entities/plant.entity';
import { PlantsController } from './plants.controller';
import { PlantService } from './plant.service';
import { Harmful } from 'src/entities/harmful.entitiy';

@Module({
  imports: [TypeOrmModule.forFeature([Plant, Harmful])],
  exports: [TypeOrmModule],
  controllers: [PlantsController],
  providers: [PlantService]
})
export class PlantsModule {}
