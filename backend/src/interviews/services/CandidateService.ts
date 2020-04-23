import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidate } from '../models/Candidate';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCandidateDto } from '../dto/CreateCandidateDto';

@Injectable()
export class CandidateService {
  constructor(@InjectRepository(Candidate) private readonly candidateRepository: Repository<Candidate>) {}

  public findAll(): Promise<Candidate[]> {
    return this.candidateRepository.find({});
  }

  public create(createCandidateDto: CreateCandidateDto): Promise<Candidate> {
    const candidate = new Candidate();

    this.createNewCandidateProperty(candidate, createCandidateDto);

    return this.candidateRepository.save(candidate);
  }

  public delete(id: number): Promise<any> {
    return this.candidateRepository.delete({ id });
  }

  createNewCandidateProperty(candidate: Candidate, createCandidateDto: CreateCandidateDto) {
    candidate.fullName = createCandidateDto.fullName;
    candidate.email = createCandidateDto.email;
    candidate.desiredPosition = createCandidateDto.desiredPosition;
    candidate.age = createCandidateDto.age;
    candidate.languageSkill = createCandidateDto.languageSkill;
  }
}
