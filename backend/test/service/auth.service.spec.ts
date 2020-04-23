import { AuthService } from '../../src/interviews/services/AuthService';
import { Test, TestingModule } from '@nestjs/testing';
import { InterviewerService } from '../../src/interviews/services/InterviewerService';
import { JwtService } from '@nestjs/jwt';
import { Interviewer } from '../../src/interviews/models/Interviewer';
import { LoginDto } from '../../src/interviews/dto/LoginDto';
import { Repository } from 'typeorm';
import { MockType, repositoryMockFactory } from './interviewer.service.spec';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Auth Service', () => {
  let authService: AuthService;
  let interviewerService: InterviewerService;
  let jwtService: JwtService;
  let interviewerRepositoryMock: MockType<Repository<Interviewer>>;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        InterviewerService,
        AuthService,
        JwtService,
        {
          provide: JwtService,
          useClass: JwtServiceMock,
        },
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },
        {
          provide: InterviewerService,
          useClass: InterviewerServiceMock,
        },
        { provide: getRepositoryToken(Interviewer), useFactory: repositoryMockFactory },
      ],
    }).compile();

    jwtService = moduleRef.get<JwtService>(JwtService);
    interviewerService = moduleRef.get<InterviewerService>(InterviewerService);
    authService = moduleRef.get<AuthService>(AuthService);
    interviewerRepositoryMock = moduleRef.get(getRepositoryToken(Interviewer));
  });

  describe('Create Interviewer', () => {
    it('should return an interviewer if successful', async () => {
      const expectedResult = new Interviewer();

      jest.spyOn(interviewerService, 'create').mockResolvedValue(expectedResult);
      expect(await interviewerService.create(expectedResult)).toBe(expectedResult);
    });
  });

  describe('Login', () => {
    it('should return UnauthorizedException exception if login invalid ', async () => {
      const interviewer = undefined;
      const dto = new LoginDto();

      interviewerRepositoryMock.findOne.mockReturnValue(interviewer);
      try {
        await authService.login(dto);
      } catch (ex) {
        expect(ex.message.status).toEqual(ex.statusCode);
        expect(ex.message.error).toEqual('Invalid credentials');
      }
    });

    it('check valid password', async () => {
      const pass = '12345';
      const passwordRequest = pass;
      const passwordStorage = pass;
      const expectedResult = true;

      jest.spyOn(authService, 'checkCredentials').mockResolvedValue(expectedResult);
      expect(await authService.checkCredentials(passwordRequest, passwordStorage)).toBeTruthy();
    });

    it('check invalid password', async () => {
      const passwordRequest = '12345';
      const passwordStorage = '54321';
      try {
        await authService.checkCredentials(passwordRequest, passwordStorage);
      } catch (exception) {
        expect(exception.message.error).toEqual('Invalid credentials');
      }
    });
  });

  describe('Validate User', () => {
    it('should return a Interviewer if successful', async () => {
      const email = 'email';
      const expectedResult = new Interviewer();

      jest.spyOn(authService, 'validateUser').mockResolvedValue(expectedResult);
      expect(await authService.validateUser(email)).toBe(expectedResult);
    });

    it('should return a UnauthorizedException exception if invalid user ', async () => {
      const email = 'octopus';
      const expectedResult = undefined;

      interviewerRepositoryMock.findOne.mockReturnValue(expectedResult);

      try {
        await authService.validateUser(email);
      } catch (exception) {
        expect(exception.message.error).toEqual('Unauthorized access');
      }
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});

class InterviewerServiceMock {
  create() {}
}

class AuthServiceMock {
  validateUser() {}

  createToken() {}

  login() {}

  checkCredentials() {}
}

class JwtServiceMock {
  sign() {}
}
