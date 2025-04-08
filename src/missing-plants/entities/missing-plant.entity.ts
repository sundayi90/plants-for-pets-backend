import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('missing-plant')
export class MissingPlant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ 
    nullable: false ,
    unique: true,  
    name: 'search_term'
  })
  searchTerm: string;

  @Column({ 
    default: 0
  })
  cnt: number;

  @CreateDateColumn(({
    name: 'created_at',
  }))
  createdAt: Date;
}