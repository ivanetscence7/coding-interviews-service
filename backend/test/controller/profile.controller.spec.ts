import { CandidateController } from '../../src/interviews/controllers/CandidateController';
import { CandidateService } from '../../src/interviews/services/CandidateService';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateCandidateDto } from '../../src/interviews/dto/CreateCandidateDto';
import { Candidate } from '../../src/interviews/models/Candidate';
import { ProfileController } from '../../src/interviews/controllers/ProfileController';
import { ProfileService } from '../../src/interviews/services/ProfileService';
import { CreateProfileDto } from '../../src/interviews/dto/CreateProfileDto';
import { InterviewerProfile } from '../../src/interviews/models/InterviewerProfile';
import { Interviewer } from '../../src/interviews/models/Interviewer';

describe('Profile Controller', () => {
  let profileController: ProfileController;
  let profileService: ProfileService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        {
          provide: ProfileService,
          useClass: ProfileServiceMock,
        },
      ],
    }).compile();

    profileController = moduleRef.get<ProfileController>(ProfileController);
    profileService = moduleRef.get<ProfileService>(ProfileService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(profileController).toBeDefined();
  });

  describe('create profile', () => {
    const dto = new CreateProfileDto();
    it('should return an object of InterviewerProfile when created', async () => {
      const expectedResult = new InterviewerProfile();
      const interviewer = new Interviewer();

      jest.spyOn(profileService, 'editProfile').mockResolvedValueOnce(Promise.resolve(expectedResult));

      expect(await profileController.create(dto, interviewer)).toBe(expectedResult);
    });
  });
});

class ProfileServiceMock {
  create() {}
}
