import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissingPlantService } from './missing-plant.service';
import { MissingPlant } from './entities/missing-plant.entity';
import { MissingPlantController } from './missing-plant.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MissingPlant])],
  providers: [MissingPlantService],
  controllers: [MissingPlantController],
  exports: [MissingPlantService]
})
export class MissingPlantModule {}
