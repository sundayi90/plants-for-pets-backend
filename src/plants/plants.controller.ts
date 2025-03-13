import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PlantService } from './plant.service';
import { Plant } from 'src/entities/plant.entity';
import { Harmful } from 'src/entities/harmful.entitiy';

@Controller('plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantService) {}

  @Get()
  async getAll(): Promise<Plant[]> {
    return this.plantsService.getAll();
  }
  
  // 해당 동물의 식물목록 가져오기
  @Get('to')
  async getPlantsHarmfulToCat(
    @Param('type') type: 'cat' | 'dog',
    @Param('level') level?: '00' | '10' | '20' | '30' | '40'
  ): Promise<Plant[]> {
    // TODO: type 안들어옴 확인하기
    console.log(type);
    return this.plantsService.getPlantsHarmfulTo(type, level);
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

  // // 식물 추가
  // @Post('plant')
  // async createPlant(
  //   @Body() plantDto: Partial<Plant>
  // ): Promise<Plant> {
  //   return this.plantsService.createPlant(plantDto);
  // }

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
    @Body() plantDto: Partial<Plant>,
  ): Promise<boolean> {
    return this.plantsService.updatePlant(id, plantDto);
  }
}


