import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Interviewer } from './Interviewer';

@Entity()
export class Problem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(
    type => Interviewer,
    interviewer => interviewer.problems,
    { eager: false },
  )
  interviewer: Interviewer;

  @Column()
  interviewerId: number;
}
