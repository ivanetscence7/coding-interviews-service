import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Interviewer } from './Interviewer';

@Entity()
export class Candidate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  fullName: string;

  @Column()
  email: string;

  @Column({ length: 500 })
  desiredPosition: string;

  @Column()
  age: number;

  @Column()
  languageSkill: string;
}
