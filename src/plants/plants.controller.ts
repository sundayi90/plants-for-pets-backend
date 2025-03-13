import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PlantService } from './plant.service';
import { Plant } from 'src/entities/plant.entity';
import { Harmful } from 'src/entities/harmful.entitiy';

@Controller('plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantService) {}

  // 식물 정보 모두 가져오기
  @Get()
  async getAll(): Promise<Plant[]> {
    return this.plantsService.getAll();
  }

  // 식물 정보 모두 가져오기
  @Get('search')
  async search(
    @Query('name') name: string
  ): Promise<Plant[]> {
    return this.plantsService.search(name);
  }

  // 해당 식물 정보 가져오기
  @Get(':id')
  async getPlant(
    @Param('id') id: number
  ): Promise<Plant> {
    return this.plantsService.getPlant(id);
  }
  
  // 해당 동물의 식물목록 가져오기
  @Get('to/:type')
  async getPlantsTo(
    @Param('type') type: 'cat' | 'dog',
    @Query('level') level?: '00' | '10' | '20' | '30' | '40'
  ): Promise<Plant[]> {
    return this.plantsService.getPlantsTo(type, level);
  }

  // 식물 추가와 해로운 영향 함께 추가
  @Post()
  async createPlantWithImpact(
    @Body() body: {
      plantDto: Partial<Plant>, 
      harmful: { 
        animalType: 'cat' | 'dog', harmfulLevel: '00' | '10' | '20' | '30' | '40', msg: string 
    }[] }
  ): Promise<Plant> {
    const { plantDto, harmful } = body;
    return this.plantsService.createPlantWithImpact(plantDto, harmful);
  }


  // 해로운 영향 추가
  @Post('harmful')
  async createHarmful(
    @Body() impactDto: Partial<Harmful>
  ): Promise<Harmful> {
    return this.plantsService.createHarmful(impactDto);
  }


  // 식물 정보 수정
  @Put(':id')
  async updatePlant(
    @Param('id') id: number,
    @Body() body: {plantDto: Partial<Plant>}
  ): Promise<string> {
    const { plantDto } = body;
    return this.plantsService.updatePlant(id, plantDto);
  }

  // 식물관련 동물타입 정보수정
  @Put(':id/:type')
  async updatePet(
    @Param('id') id: number,
    @Param('type') type: 'cat' | 'dog',
    @Body() body: {
      harmful: { harmfulLevel: '00' | '10' | '20' | '30' | '40', msg: string }
    }
  ): Promise<string> {
    const { harmful } = body;
    return this.plantsService.updatePet(id, type, harmful);
  }
}


