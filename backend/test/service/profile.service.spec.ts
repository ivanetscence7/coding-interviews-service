import { ProfileService } from '../../src/interviews/services/ProfileService';
import { Repository } from 'typeorm';
import { Interviewer } from '../../src/interviews/models/Interviewer';
import { MockType, repositoryMockFactory } from './interviewer.service.spec';
import { InterviewerProfile } from '../../src/interviews/models/InterviewerProfile';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateProfileDto } from '../../src/interviews/dto/CreateProfileDto';
import { EditProfileDto } from '../../../frontend/src/app/interviews/dto/edit-profile.dto';

describe('Profile Service', () => {
  let profileService: ProfileService;
  let profileRepositoryMock: MockType<Repository<InterviewerProfile>>;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        { provide: getRepositoryToken(InterviewerProfile), useFactory: repositoryMockFactory },
        {
          provide: ProfileService,
          useClass: ProfileServiceMock,
        },
      ],
    }).compile();

    profileService = moduleRef.get<ProfileService>(ProfileService);
    profileRepositoryMock = moduleRef.get(getRepositoryToken(InterviewerProfile));
  });

  describe('get profile info', () => {
    it('should return NotFoundException if interviewer is empty', async () => {
      const profile = undefined;
      const interviewer = new Interviewer();

      profileRepositoryMock.findOne.mockReturnValue(profile);

      try {
        await profileService.getProfileInfo(interviewer);
      } catch (ex) {
        expect(ex.message).toEqual('Oops! Your profile not found');
      }
    });

    it('call getProfileInfo and return the result', async () => {
      const profile = new InterviewerProfile();
      jest.spyOn(profileService, 'getProfileInfo').mockResolvedValue(profile);

      const interviewer = new Interviewer();
      interviewer.id = 1;

      const result = await profileService.getProfileInfo(interviewer);
      expect(result).toEqual(profile);
    });
  });

  it('edit profile', async () => {
    const profile = new InterviewerProfile();
    jest.spyOn(profileService, 'editProfile').mockResolvedValue(profile);

    const editProfileDto = new EditProfileDto();
    const interviewer = new Interviewer();

    const result = await profileService.editProfile(editProfileDto, interviewer);
    expect(result).toEqual(profile);
  });

  it('delete', async () => {
    const interviewer = new Interviewer();
    interviewer.id = 1;
    const result = new InterviewerProfile();
    jest.spyOn(profileService, 'delete').mockImplementation(() => Promise.resolve(result));
    expect(await profileService.delete(interviewer.id)).toBe(result);
  });
});

export class ProfileServiceMock {
  editProfile() {}

  delete() {}

  getProfileInfo() {}
}
