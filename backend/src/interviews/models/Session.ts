import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  candidateEmail: string;

  @Column()
  problemTitle: string;

  @Column()
  problemDescription: string;

  @Column()
  sessionUuid: string;
}
