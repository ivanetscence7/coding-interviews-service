import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Problem } from './Problem';
import { InterviewerProfile } from './InterviewerProfile';
import * as bcrypt from 'bcrypt';

@Entity()
export class Interviewer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @OneToMany(
    type => Problem,
    problem => problem.interviewer,
    { eager: true },
  )
  problems: Problem[];

  @OneToOne(type => InterviewerProfile)
  @JoinColumn()
  interviewerProfile: InterviewerProfile;
}
