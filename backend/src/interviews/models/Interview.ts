import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Interview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  interviewCandidateEmail: string;

  @Column()
  uuid: string;
}
