import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PlantService } from './plant.service';
import { Plant } from 'src/entities/plant.entity';
import { Harmful } from 'src/entities/harmful.entitiy';
import { CreatePlantDto, UpdatePlantDto } from 'src/dto/plant.dto';
import { CreateHarmfulDto, UpdateHarmfulDto } from 'src/dto/harmful.dto';

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
  @UsePipes(new ValidationPipe({ transform: true }))
  async createPlantWithImpact(
    @Body() body: {
      plantDto: CreatePlantDto,
      harmfulDto: CreateHarmfulDto[]
    }
  ): Promise<Plant> {
    const { plantDto, harmfulDto } = body;
    return this.plantsService.createPlantWithImpact(plantDto, harmfulDto);
  }

  // 해로운 영향 추가
  @UsePipes(new ValidationPipe({ transform: true }))
  async createHarmful(
    @Body() harmfulDto: CreateHarmfulDto
  ): Promise<Harmful> {
    return this.plantsService.createHarmful(harmfulDto);
  }


  // 식물 정보 수정
  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updatePlant(
    @Param('id') id: number,
    @Body() body: { plantDto: UpdatePlantDto }
  ): Promise<string> {
    const { plantDto } = body;
    return this.plantsService.updatePlant(id, plantDto);
  }  

  // 식물관련 동물타입 정보수정
  @Put(':id/:type')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updatePet(
    @Param('id') id: number,
    @Param('type') type: 'cat' | 'dog',
    @Body() body: { harmfulDto: UpdateHarmfulDto }
  ): Promise<string> {
    const { harmfulDto } = body;
    return this.plantsService.updatePet(id, type, harmfulDto);
  }

  // 식물 삭제 (연관된 harmful도 자동으로 삭제됨)
  @Delete(':id')
  async deletePlant(
    @Param('id') id: number
  ): Promise<string> {
    return this.plantsService.deletePlant(id);
  }

  // 특정 harmful 삭제
  @Delete('harmful/:id')
  async deleteHarmful(
    @Param('id') id: number
  ): Promise<string> {
    return this.plantsService.deleteHarmful(id);
  }
}


