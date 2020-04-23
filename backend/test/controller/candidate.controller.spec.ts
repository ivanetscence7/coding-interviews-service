import { Test, TestingModule } from '@nestjs/testing';
import { CandidateController } from '../../src/interviews/controllers/CandidateController';
import { CandidateService } from '../../src/interviews/services/CandidateService';
import { CreateCandidateDto } from '../../src/interviews/dto/CreateCandidateDto';
import { Candidate } from '../../src/interviews/models/Candidate';

class CandidateServiceMock {
  create() {}

  findAll() {}

  delete() {}
}

describe('Candidate Controller', () => {
  let candidateController: CandidateController;
  let candidateService: CandidateService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CandidateController],
      providers: [
        {
          provide: CandidateService,
          useClass: CandidateServiceMock,
        },
      ],
    }).compile();

    candidateController = await moduleRef.get<CandidateController>(CandidateController);
    candidateService = await moduleRef.get<CandidateService>(CandidateService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(candidateController).toBeDefined();
  });

  describe('create candidate', () => {
    it('should return an object of candidate when created', async () => {
      const dto = new CreateCandidateDto();
      const expectedResult = new Candidate();
      jest.spyOn(candidateService, 'create').mockResolvedValue(expectedResult);

      expect(await candidateController.create(dto)).toBe(expectedResult);
    });
  });

  describe('get all candidates from service', () => {
    it('should return an array of candidates', () => {
      let expectedResult: Promise<Candidate[]> = new Promise(resolve => {});
      jest.spyOn(candidateService, 'findAll').mockResolvedValueOnce(expectedResult);
      const result = candidateService.findAll();
      expect(candidateService.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });
});
