import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Harmful } from 'src/entities/harmful.entitiy';
import { Plant } from 'src/entities/plant.entity';
import { Repository } from 'typeorm';

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
    return this.plantRepository.find({
      where: { name: `%${name}%` }, // 이름에 포함된 식물들을 찾기 위해 LIKE 사용
    });
  }

  // 해당 동물에게 해로운 식물 목록 가져오기
  async getPlantsHarmfulTo(
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

  // // 식물 추가
  // async createPlant(plantDto: Partial<Plant>): Promise<Plant> {
  //   const plant = this.plantRepository.create(plantDto);
  //   return this.plantRepository.save(plant);
  // }

  // 해로운 영향 추가
  async createHarmful(impactDto: Partial<Harmful>): Promise<Harmful> {
    const harmful = this.harmfulRepository.create(impactDto);
    return this.harmfulRepository.save(harmful);
  }

   // 식물 추가와 해로운 영향 함께 추가하는 메서드
   async createPlantWithImpact(
    plantDto: Partial<Plant>, 
    harmful: { animalType: 'cat' | 'dog', harmfulLevel: '00' | '10' | '20' | '30' | '40' , msg: string }[]
  ): Promise<Plant> {
    const queryRunner = this.plantRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      // 1. 식물 생성
      const plant = this.plantRepository.create(plantDto);
      await queryRunner.manager.save(plant); // 식물 저장

      // 2. 해로운 영향 추가
      for (const impactDto of harmful) {
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

  // 식물 정보 수정
  async updatePlant(id: number, plantDto: Partial<Plant>): Promise<boolean> {
    const plant = await this.plantRepository.update(id, plantDto);
    if(!plant) {
      return false;
    }
    return true;

    // return this.plantRepository.findOne({where: {id}}); // 수정된 식물 반환
  }

}
