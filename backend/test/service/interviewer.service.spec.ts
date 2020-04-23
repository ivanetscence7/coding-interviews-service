import { AuthService } from '../../src/interviews/services/AuthService';
import { Test, TestingModule } from '@nestjs/testing';
import { RegisterInterviewerDto } from '../../src/interviews/dto/RegisterInterviewerDto';
import { LoginDtoResponse } from '../../src/interviews/dto/LoginDtoResponse';
import { Interviewer } from '../../src/interviews/models/Interviewer';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InterviewerService } from '../../src/interviews/services/InterviewerService';

import { JwtService } from '@nestjs/jwt';

describe('Interviewer Service', () => {
  let interviewerService: InterviewerService;
  let jwtService: JwtService;
  let interviewerRepositoryMock: MockType<Repository<Interviewer>>;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        InterviewerService,
        AuthService,
        JwtService,
        { provide: getRepositoryToken(Interviewer), useFactory: repositoryMockFactory },
        { provide: getRepositoryToken(LoginDtoResponse), useFactory: repositoryMockFactory },
        {
          provide: JwtService,
          useClass: JwtServiceMock,
        },
      ],
    }).compile();

    jwtService = moduleRef.get<JwtService>(JwtService);
    interviewerService = moduleRef.get<InterviewerService>(InterviewerService);
    interviewerRepositoryMock = moduleRef.get(getRepositoryToken(Interviewer));
  });

  describe('create Interviewer', () => {
    it('should return BadRequestException exception if interviewer already exists ', async () => {
      const interviewer = new Interviewer();
      interviewerRepositoryMock.findOne.mockReturnValue(interviewer);
      try {
        await interviewerService.create(interviewer);
      } catch (ex) {
        expect(ex.message.status).toEqual(400);
        expect(ex.message.error).toEqual('User already exists');
      }
    });

    afterEach(() => {
      jest.resetAllMocks();
    });
  });

  describe('get Interviewer by email', () => {
    it('should return an object of Interviewer when created', async () => {
      const email = 'email';
      const entity = new Interviewer();
      interviewerRepositoryMock.findOne.mockReturnValue(entity);
      expect(await interviewerService.getInterviewerByEmail(email)).toEqual(entity);
    });

    it('should return NotFoundException exception if interviewer undefined ', async () => {
      const email = 'octopus';
      const expectedResult = undefined;
      interviewerRepositoryMock.findOne.mockReturnValue(expectedResult);
      try {
        await interviewerService.getInterviewerByEmail(email);
      } catch (e) {
        expect(e.message.statusCode).toEqual(404);
        expect(e.message.error).toEqual('Interviewer not found');
      }
    });

    afterEach(() => {
      jest.resetAllMocks();
    });
  });
});

class JwtServiceMock {
  sign() {}
}

export const repositoryMockFactory: jest.Mock<
  {
    find: jest.Mock<any, any>;
    findOne: jest.Mock<any, any>;
    save: jest.Mock<any, any>;
    update: jest.Mock<any, any>;
    delete: jest.Mock<any, any>;
  },
  any[]
> = jest.fn(() => ({
  findOne: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
}));
export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};
