import { Entity, Column, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { PetToxicity } from './pet-toxicity.entity';

@Entity('plant')
export class Plant{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true , unique: true, name: 'eng_name'})
  engName?: string;

  @Column({ nullable: true })
  desc?: string;

  @Column({ nullable: true })
  img?: string;

  @Column()
  species: string;

  @OneToMany(() => PetToxicity, (petToxicity) => petToxicity.plant)
  petToxicities: PetToxicity[];

  @CreateDateColumn(({
    name: 'created_at',
  }))
  createdAt: Date;

  @UpdateDateColumn(({
    name: 'updated_at',
  }))
  updatedAt: Date;
}
