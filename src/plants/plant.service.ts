import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VerifyUtil } from 'src/common/verify.util';
import { Harmful } from 'src/entities/harmful.entitiy';
import { Plant } from 'src/entities/plant.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class PlantService {  
  constructor(
    @InjectRepository(Plant) private plantRepository: Repository<Plant>,
    @InjectRepository(Harmful) private harmfulRepository: Repository<Harmful>,
  ) {}

  // 모든 식물 목록 가져오기
  async getAll(): Promise<Plant[]> {
    return this.plantRepository.find();
  }

  // 식물 이름으로 검색
  async search(name: string): Promise<Plant[]> {
    const plant = await this.plantRepository.find({
      where: VerifyUtil.isEng(name) ? {engName : Like(`%${name}%`)} : {name : Like(`%${name}%`)}
    });
    
    return plant;
  }

  // 해당 식물 가져오기
  async getPlant(id: number): Promise<Plant> {
    const plant = await this.plantRepository.findOne({where: {id}});
    if(!plant) {
      throw new NotFoundException('해당되는 식물이 없습니다.');
    } 
    return plant;
  }

  // 해당 동물에게 식물 목록 가져오기
  async getPlantsTo(
    type: 'cat' | 'dog', 
    level?: '00' | '10' | '20' | '30' | '40'
  ): Promise<Plant[]> {
    const harmfulRecords = await this.harmfulRepository.find({
      where: level ? {animalType: type, harmfulLevel: level} : {animalType: type} ,
      relations: ['plant'], // 식물 정보를 가져옴
    });
    // console.log(type, harmfulRecords);

    // 해로운 식물 목록을 반환
    return harmfulRecords.map((impact) => impact.plant);
  }


   // 식물 추가와 해로운 영향 함께 추가하는 메서드
   async createPlantWithImpact(
    plantDto: Partial<Plant>, 
    harmfulDto: Partial<Harmful>[]
  ): Promise<Plant> {
    const queryRunner = this.plantRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      // 1. 식물 생성
      const plant = this.plantRepository.create(plantDto);
      await queryRunner.manager.save(plant); // 식물 저장
      
      if(!harmfulDto){
        await queryRunner.commitTransaction(); // 트랜잭션 커밋
        return plant; // 생성된 식물만 저장
      }

      // 2. 해로운 영향 추가
      for (const impactDto of harmfulDto) {
        const harmfulImpact = this.harmfulRepository.create({
          plant,
          animalType: impactDto.animalType,
          harmfulLevel: impactDto.harmfulLevel,
          msg: impactDto.msg,
        });
        await queryRunner.manager.save(harmfulImpact); // 해로운 영향 저장
      }

      await queryRunner.commitTransaction(); // 트랜잭션 커밋
      return plant; // 생성된 식물 반환

    } catch (error) {
      await queryRunner.rollbackTransaction(); // 트랜잭션 롤백
      throw error; // 오류 던지기

    } finally {
      await queryRunner.release(); // 쿼리러너 해제
    }
  }


  // 해로운 영향 추가
  async createHarmful(harmfulDto: Partial<Harmful>): Promise<Harmful> {
    const harmful = this.harmfulRepository.create(harmfulDto);
    return this.harmfulRepository.save(harmful);
  }

  // 식물 정보 수정
  async updatePlant(id: number, plantDto: Partial<Plant>): Promise<string> {
    const { name, engName, desc, img } = plantDto;
    const plantUpdate = await this.plantRepository.update(id, {
      name, engName, desc, img
    });

    if(!plantUpdate.affected) {
      return '식물정보 수정에 실패했습니다.';
    }
    return '식물정보 수정에 성공했습니다.';
  }

  // 식물관련 동물타입 정보수정
  async updatePet(
    id: number, 
    type: 'cat' | 'dog',
    harmfulDto: Partial<Harmful>
  ): Promise<string> {
    const { harmfulLevel, msg } = harmfulDto;
    const plant = await this.getPlant(id);
    const findHarmful = await this.harmfulRepository.findOne({where: {
      plant,
      animalType: type
    }});
    
    // 테이블에 없을시 새로 생성
    if(!findHarmful) {
      if(!harmfulLevel) {
        return '해당정보를 새로 생성해야합니다. 새로 생성시 \"위험레벨\"은 필수 값입니다.';
      }
      this.createHarmful({plant, animalType: type, harmfulLevel, msg});
      return '해당정보 생성에 성공했습니다.';
    } 

    // 정보 업데이트
    const petUpdate = await this.harmfulRepository.update(findHarmful.id, {
      harmfulLevel, msg
    });

    if(!petUpdate.affected) {
      return '해당정보 수정에 실패했습니다.';
    }
    return '해당정보 수정에 성공했습니다.';
  }

  // 식물 삭제 (연관된 harmful도 자동으로 삭제됨)
  async deletePlant(id: number): Promise<string> {
    const plant = await this.plantRepository.findOne({ where: { id } });

    if (!plant) {
      throw new NotFoundException('해당 식물이 존재하지 않습니다.');
    }

    // 식물 삭제 (연관된 harmful은 CASCADE로 자동 삭제됨)
    await this.plantRepository.remove(plant);
    return '식물이 성공적으로 삭제되었습니다.';
  }

  // 특정 harmful 삭제
  async deleteHarmful(id: number): Promise<string> {
    const harmful = await this.harmfulRepository.findOne({ where: { id } });

    if (!harmful) {
      throw new NotFoundException('해당 정보가 존재하지 않습니다.');
    }

    // harmful 삭제
    await this.harmfulRepository.remove(harmful);
    return '해로운 정보가 성공적으로 삭제되었습니다.';
  }

}


