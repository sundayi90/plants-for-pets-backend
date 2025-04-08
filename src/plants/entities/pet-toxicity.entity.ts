import { Entity, ManyToOne, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn} from 'typeorm';
import { Plant } from './plant.entity';

@Entity('pet-toxicity')
export class PetToxicity{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Plant, (plant) => plant.petToxicities, { onDelete: 'CASCADE' })
  plant: Plant;

  @Column({
    type: 'enum',
    enum: ['cat', 'dog'],
    default: 'cat',
    name: 'pet_type'
  })
  petType?: 'cat' | 'dog';

  @Column({
    type: 'enum',
    enum: ['00', '10', '20', '30', '40'], // 정보없음 00, 안전 10, 주의 20, 위험 30, 심각 40
    default: '00',
    name: 'toxic_level'
  })
  toxicLevel: string;

  @Column({ nullable: true })
  msg?: string;

  @CreateDateColumn(({
    name: 'created_at',
  }))
  createdAt: Date;

  @UpdateDateColumn(({
    name: 'updated_at',
  }))
  updatedAt: Date;
}
