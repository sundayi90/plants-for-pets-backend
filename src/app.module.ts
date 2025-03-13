import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { mariaDBConnector } from './databases.connector';
import { Plant } from './entities/plant.entity';
import { PlantsModule } from './plants/plants.module';
import { Harmful } from './entities/harmful.entitiy';

const mariaDBEntities: Function[] = [Plant, Harmful];


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
