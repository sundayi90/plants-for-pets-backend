import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VerifyUtil } from 'src/common/verify.util';
import { CreatePlantDto, UpdatePlantDto } from 'src/dto/plant.dto';
import { PetToxicity } from 'src/entities/pet-toxicity.entitiy';
import { Plant } from 'src/entities/plant.entity';
import { Like, QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class PlantService {  
  constructor(
    @InjectRepository(Plant) private plantRepository: Repository<Plant>,
    @InjectRepository(PetToxicity) private toxicRepository: Repository<PetToxicity>,
  ) {}

  // 모든 식물 목록 가져오기
  async getAll({ page, limit }): Promise<{ data: Plant[]; total: number }> {
    const take = limit;
    const skip = (page - 1) * limit;

    const [data, total] = await this.plantRepository.findAndCount({
      relations: ['petToxicities'],  // 반려동물 정보 포함
      take,
      skip,
    });

    return {
      data,
      total,
    };
  }


  // 식물 이름으로 검색
  async search(name: string): Promise<Plant[]> {
    return await this.plantRepository.find({ 
      where: VerifyUtil.isEng(name) ? {engName : Like(`%${name}%`)} : {name : Like(`%${name}%`)},
      relations: ['petToxicities'] 
    });
  }

  async filterByPetType(petType: string, toxicLevel?: string): Promise<Plant[]> {
    const query = this.plantRepository.createQueryBuilder('plant')
      .leftJoinAndSelect('plant.petToxicities', 'petToxicity')
      .where('petToxicity.petType = :petType', { petType });

    if (toxicLevel) {
      query.andWhere('petToxicity.toxicLevel = :toxicLevel', { toxicLevel });
    }

    return await query.getMany();
  }  

  // 해당 식물 가져오기
  async getPlant(id: number): Promise<Plant> {
    const plant = await this.plantRepository.findOne({where: {id}, relations: ['petToxicities']});
    if(!plant) {
      throw new NotFoundException('해당되는 식물이 없습니다.');
    } 
    return plant;
  }

  async createPlant(createPlantDto: CreatePlantDto): Promise<string> {
    const { petToxicities, ...plantData } = createPlantDto;
    const plant = this.plantRepository.create(plantData);
    try {
      const savedPlant = await this.plantRepository.save(plant);

      if (petToxicities && petToxicities.length > 0) {
        const toxicityEntities = petToxicities.map(toxicity =>
          this.toxicRepository.create({ ...toxicity, plant: savedPlant })
        );
        
        await this.toxicRepository.save(toxicityEntities);
      }
  
      if(!savedPlant) {
        return '식물정보 생성에 실패했습니다.';
      }
      return '식물정보 생성에 성공했습니다.';

    } catch (error) {
      if(error.code == "ER_DUP_ENTRY") {
        return `[${error.code}] -- ${error.sqlMessage}`;
      }
      return error;
    }
  }

  async updatePlant(id: number, updatePlantDto: UpdatePlantDto) {
    const { ...plantData } = updatePlantDto;
    await this.plantRepository.update(id, plantData);
    const updatedPlant = await this.plantRepository.findOne({ where: { id }, relations: ['petToxicities'] });

    if(!updatedPlant) {
      return '식물정보 수정에 실패했습니다.';
    }
    return '식물정보 수정에 성공했습니다.';
  }

  // 식물관련 동물타입 정보수정
  async updatePet(
    id: number, 
    petToxicDto: Partial<PetToxicity>
  ): Promise<string> {
    const petUpdate = await this.toxicRepository.update(id, petToxicDto);

    if(!petUpdate.affected) {
      return '해당정보 수정에 실패했습니다.';
    }
    return '해당정보 수정에 성공했습니다.';
  }


  // 식물 삭제 (연관된 Toxic도 자동으로 삭제됨)
  async deletePlant(id: number): Promise<string> {
    const plant = await this.plantRepository.findOne({ where: { id } });

    if (!plant) {
      throw new NotFoundException('해당 식물이 존재하지 않습니다.');
    }

    // 식물 삭제 (연관된 Toxic은 CASCADE로 자동 삭제됨)
    await this.plantRepository.remove(plant);
    return '식물이 성공적으로 삭제되었습니다.';
  }

  // 특정 Toxic 삭제
  async deleteToxic(id: number): Promise<string> {
    const Toxic = await this.toxicRepository.findOne({ where: { id } });

    if (!Toxic) {
      throw new NotFoundException('해당 정보가 존재하지 않습니다.');
    }

    // Toxic 삭제
    await this.toxicRepository.remove(Toxic);
    return '해로운 정보가 성공적으로 삭제되었습니다.';
  }

}


