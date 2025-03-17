import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { mariaDBConnector } from './common/databases.connector';
import { Plant } from './entities/plant.entity';
import { PlantsModule } from './plants/plants.module';
import { PetToxicity } from './entities/pet-toxicity.entitiy';

const mariaDBEntities: Function[] = [Plant, PetToxicity];


@Module({
  imports: [
    mariaDBConnector(mariaDBEntities),
    PlantsModule,
  ],
  controllers: [AppController,],
  providers: [],
})
export class AppModule {
  // constructor(private dataSource: DataSource) {}
}
