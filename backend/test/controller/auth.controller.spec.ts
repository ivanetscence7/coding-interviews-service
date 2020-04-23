import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/interviews/controllers/AuthController';
import { AuthService } from '../../src/interviews/services/AuthService';
import { LoginDtoResponse } from '../../src/interviews/dto/LoginDtoResponse';
import { RegisterInterviewerDto } from '../../src/interviews/dto/RegisterInterviewerDto';
import { InterviewerService } from '../../src/interviews/services/InterviewerService';

class AuthServiceMock {
  registerInterviewer() {}
}

describe('Auth Controller', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },
      ],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('register interviewer', () => {
    const dto = new RegisterInterviewerDto();

    it('should return an object of LoginDtoResponse when created', async () => {
      const expectedResult = new LoginDtoResponse();

      jest.spyOn(authService, 'registerInterviewer').mockResolvedValueOnce(Promise.resolve(expectedResult));

      expect(await authController.registerInterviewer(dto)).toBe(expectedResult);
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
