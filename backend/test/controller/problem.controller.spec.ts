import { Test, TestingModule } from '@nestjs/testing';
import { ProblemController } from '../../src/interviews/controllers/ProblemController';
import { ProblemService } from '../../src/interviews/services/ProblemService';
import { ProblemDto } from '../../src/interviews/dto/ProblemDto';
import { Problem } from '../../src/interviews/models/Problem';
import { Interviewer } from '../../src/interviews/models/Interviewer';

class ProblemServiceMock {
  create() {}

  findAll() {}

  delete() {}

  update() {}
}

const mockInterviewer = {
  firstName: 'Ivan',
  lastName: 'Ivanov',
  email: 'email@gmail.com',
  password: '123',
} as Interviewer;

describe('Problem Controller', () => {
  let problemController: ProblemController;
  let problemService: ProblemService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ProblemController],
      providers: [
        {
          provide: ProblemService,
          useClass: ProblemServiceMock,
        },
      ],
    }).compile();

    problemController = await moduleRef.get<ProblemController>(ProblemController);
    problemService = await moduleRef.get<ProblemService>(ProblemService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(problemController).toBeDefined();
  });

  describe('create problem', () => {
    it('should return an object of problem when created', async () => {
      const dto = new ProblemDto();
      const expectedResult = new Problem();
      jest.spyOn(problemService, 'create').mockResolvedValue(expectedResult);

      expect(await problemController.create(dto, mockInterviewer)).toBe(expectedResult);
    });
  });

  describe('update problem', () => {
    it('should return an object of problem when updated', async () => {
      const dto = new ProblemDto();
      const expectedResult = new Problem();
      jest.spyOn(problemService, 'update').mockResolvedValue(expectedResult);
      expect(await problemController.update(dto, mockInterviewer)).toBe(expectedResult);
    });
  });

  describe('get all problems from service', () => {
    it('should return an array of problems', () => {
      let expectedResult: Promise<Problem[]> = new Promise(resolve => {});
      jest.spyOn(problemService, 'findByInterviewer').mockResolvedValueOnce(expectedResult);
      const result = problemService.findByInterviewer(mockInterviewer);
      expect(problemService.findByInterviewer).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });
});
