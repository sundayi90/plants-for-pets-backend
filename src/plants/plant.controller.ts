import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PlantService } from './plant.service';
import { Plant } from 'src/plants/entities/plant.entity';
import { CreatePlantDto, UpdatePlantDto } from 'src/plants/dto/plant.dto';
import { PetToxicDto } from 'src/plants/dto/pet-toxicity.dto';
import { ResultDto } from './dto/result.dto';

@Controller('plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantService) {}

  // 식물 정보 모두 가져오기
  @Get()
  async getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ data: Plant[]; total: number }> {
    return this.plantsService.getAll({ page, limit });
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
  @Get('filter/:type')
  async filterBy(
    @Param('type') type: 'cat' | 'dog' | 'both',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('level') level?: '00' | '10' | '20' | '30' | '40'
  ): Promise<any[]> {
    return this.plantsService.filterBy(type, page-1, limit, level);
  }

  // 식물 추가와 해로운 영향 함께 추가
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createPlant(
    @Body() createPlantDto: CreatePlantDto
  ): Promise<ResultDto> {
    return this.plantsService.createPlant(createPlantDto);
  }

  // 식물 정보 수정
  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updatePlant(
    @Param('id') id: number,
    @Body() updatePlantDto: UpdatePlantDto
  ): Promise<ResultDto> {
    return this.plantsService.updatePlant(id, updatePlantDto);
  }  

  // 동물 정보 수정
  @Patch('toxic/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updatePet(
    @Param('id') id: number,
    @Body() petToxicDto: PetToxicDto
  ): Promise<ResultDto> {
    return this.plantsService.updatePet(id, petToxicDto);
  }   

  // 식물 삭제 (연관된 Toxic도 자동으로 삭제됨)
  @Delete(':id')
  async deletePlant(
    @Param('id') id: number
  ): Promise<ResultDto> {
    return this.plantsService.deletePlant(id);
  }

  // 특정 Toxic 삭제
  @Delete('toxic/:id')
  async deleteToxic(
    @Param('id') id: number
  ): Promise<ResultDto> {
    return this.plantsService.deleteToxic(id);
  }
}


