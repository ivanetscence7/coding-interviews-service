import { MockType, repositoryMockFactory } from './interviewer.service.spec';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProblemService } from '../../src/interviews/services/ProblemService';
import { Problem } from '../../src/interviews/models/Problem';
import { ProblemDto } from '../../src/interviews/dto/ProblemDto';
import { Interviewer } from '../../src/interviews/models/Interviewer';

const mockInterviewer = {
  firstName: 'Ivan',
  lastName: 'Ivanov',
  email: 'email@gmail.com',
  password: '123',
} as Interviewer;

describe('Problem Service', () => {
  let problemService: ProblemService;
  let problemRepositoryMock: MockType<Repository<Problem>>;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ProblemService,
        {
          provide: getRepositoryToken(Problem),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    problemService = moduleRef.get<ProblemService>(ProblemService);
    problemRepositoryMock = moduleRef.get(getRepositoryToken(Problem));
  });

  it('create/update Problem', () => {
    const problem = new Problem();
    const problemDto = new ProblemDto();
    problemRepositoryMock.save.mockReturnValue(problem);
    expect(problemService.create(problemDto, mockInterviewer)).toEqual(problem);
  });

  it('delete Problem', () => {
    let expectedResult: Promise<Problem> = new Promise(resolve => {});
    const id = 1;
    problemRepositoryMock.delete.mockReturnValue(expectedResult);
    expect(problemService.delete(id, mockInterviewer)).toEqual(expectedResult);
  });

  it('get all Problems', () => {
    let expectedResult: Promise<Problem[]> = new Promise(resolve => {});
    problemRepositoryMock.find.mockReturnValue(expectedResult);
    expect(problemService.findByInterviewer(mockInterviewer)).toEqual(expectedResult);
  });
});
