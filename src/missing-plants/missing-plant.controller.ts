import { Body, Controller, Post } from '@nestjs/common';
import { MissingPlantService } from './missing-plant.service';
import { CreateMissingPlantDto } from './dto/missing-plant.dto';

@Controller('missing-plants')
export class MissingPlantController {
  constructor(private readonly service: MissingPlantService) {}

  @Post()
  create(@Body() dto: CreateMissingPlantDto) {
    return this.service.create(dto);
  }
}