import { CandidateService } from '../../src/interviews/services/CandidateService';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockType, repositoryMockFactory } from './interviewer.service.spec';
import { Candidate } from '../../src/interviews/models/Candidate';
import { Repository } from 'typeorm';
import { CreateCandidateDto } from '../../src/interviews/dto/CreateCandidateDto';

describe('Candidate Service', () => {
  let candidateService: CandidateService;
  let candidateRepositoryMock: MockType<Repository<Candidate>>;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [CandidateService, { provide: getRepositoryToken(Candidate), useFactory: repositoryMockFactory }],
    }).compile();
    candidateService = moduleRef.get<CandidateService>(CandidateService);
    candidateRepositoryMock = moduleRef.get(getRepositoryToken(Candidate));
  });

  it('create Candidate', () => {
    const candidate = new Candidate();
    const createCandidateDto = new CreateCandidateDto();
    candidateRepositoryMock.save.mockReturnValue(candidate);
    expect(candidateService.create(createCandidateDto)).toEqual(candidate);
  });

  it('delete Candidate', () => {
    let expectedResult: Promise<Candidate> = new Promise(resolve => {});
    const id = 1;
    candidateRepositoryMock.delete.mockReturnValue(expectedResult);
    expect(candidateService.delete(id)).toEqual(expectedResult);
  });

  it('get all Candidates', () => {
    let expectedResult: Promise<Candidate[]> = new Promise(resolve => {});
    candidateRepositoryMock.find.mockReturnValue(expectedResult);
    expect(candidateService.findAll()).toEqual(expectedResult);
  });
});
