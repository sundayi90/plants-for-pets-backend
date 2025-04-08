import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { MissingPlant } from './entities/missing-plant.entity';
import { CreateMissingPlantDto } from './dto/missing-plant.dto';

@Injectable()
export class MissingPlantService {
  constructor(
    @InjectRepository(MissingPlant)
    private readonly missingPlantRepo: Repository<MissingPlant>,
  ) {}

  async create(dto: CreateMissingPlantDto): Promise<MissingPlant> {
    const { searchTerm } = dto;

    const existing = await this.missingPlantRepo.findOne({ where: { searchTerm } });

    if (existing) {
      // 이미 있으면 count 증가
      existing.cnt += 1;
      return this.missingPlantRepo.save(existing);
    } else {
      // 없으면 새로 생성
      const entry = this.missingPlantRepo.create({ searchTerm, cnt: 1 });
      return this.missingPlantRepo.save(entry);
    }
  }

  // 해당검색어 삭제
  async remove(searchTerm: string): Promise<string> {
    const missing = await this.missingPlantRepo.findOne({ where: { searchTerm : Like(`%${searchTerm}%`) } });

    if (!missing) {
      return '해당 검색어 기록이 존재하지 않습니다.';
    }

    // 식물 삭제 (연관된 Toxic은 CASCADE로 자동 삭제됨)
    await this.missingPlantRepo.remove(missing);
    return '해당 검색어가 목록에서 삭제되었습니다.';
  }
  
}
