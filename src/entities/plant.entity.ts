import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import { Core } from './core.entity';

@Entity('plant')
export class Plant extends Core{

  @Column()
  name?: string;

  @Column({ nullable: true , name: 'eng_name'})
  engName?: string;

  @Column({ nullable: true })
  desc?: string;

  @Column({ nullable: true })
  img?: string;

}
