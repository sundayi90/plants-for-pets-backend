import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity('plant')
export class Plant {
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

  @Column()
  name?: string;

  @Column({ nullable: true , name: 'eng_name'})
  engName?: string;

  @Column({ nullable: true })
  desc?: string;

  @Column({ nullable: true })
  img?: string;

}
