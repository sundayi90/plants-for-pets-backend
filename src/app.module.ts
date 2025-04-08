import { Module } from '@nestjs/common';
import { mariaDBConnector } from './common/databases.connector';
import { Plant } from './plants/entities/plant.entity';
import { PlantsModule } from './plants/plant.module';
import { PetToxicity } from './plants/entities/pet-toxicity.entity';
import { MissingPlantModule } from './missing-plants/missing-plant.module';
import { MissingPlant } from './missing-plants/entities/missing-plant.entity';

const mariaDBEntities: Function[] = [Plant, PetToxicity, MissingPlant];


@Module({
  imports: [
    mariaDBConnector(mariaDBEntities),
    PlantsModule,
    MissingPlantModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  // constructor(private dataSource: DataSource) {}
}
