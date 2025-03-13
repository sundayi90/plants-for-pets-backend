import { Entity, ManyToOne, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn} from 'typeorm';
import { Plant } from './plant.entity';

@Entity('harmful')
export class Harmful {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn(({
    name: 'created_at',
  }))
  createdAt: Date;

  @UpdateDateColumn(({
    name: 'updated_at',
  }))
  updatedAt: Date;

  @ManyToOne(() => Plant, (plant) => plant.id)
  @JoinColumn()
  plant: Plant;

  @Column({
    type: 'enum',
    enum: ['cat', 'dog'],
    default: 'cat',
    name: 'animal_type'
  })
  animalType?: 'cat' | 'dog';

  @Column({
    type: 'enum',
    enum: ['00', '10', '20', '30', '40'], // 정보없음 00, 안전 10, 주의 20, 위험 30, 심각 40
    default: '00',
    name: 'harmful_level'
  })
  harmfulLevel: string;

  @Column({ nullable: true })
  msg?: string;
}
