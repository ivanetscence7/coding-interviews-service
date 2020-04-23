import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Interviewer } from './Interviewer';

@Entity()
export class InterviewerProfile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  skype: string;

  @Column()
  position: string;

  @Column()
  education: string;

  @Column()
  organization: string;

  @Column()
  interviewerId: number;
}
