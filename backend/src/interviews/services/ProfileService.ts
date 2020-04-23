import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from '../dto/CreateProfileDto';
import { InjectRepository } from '@nestjs/typeorm';
import { InterviewerProfile } from '../models/InterviewerProfile';
import { Repository } from 'typeorm';
import { Interviewer } from '../models/Interviewer';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(InterviewerProfile) private readonly profileRepository: Repository<InterviewerProfile>,
  ) {}

  getProfileInfo(interviewer: Interviewer): Promise<InterviewerProfile> {
    const profile = this.profileRepository.findOne({
      where: {
        interviewerId: interviewer.id,
      },
    });
    if (!profile) {
      throw new NotFoundException('Oops! Your profile not found');
    } else {
      return profile;
    }
  }

  createEmptyProfile(interviewer: Interviewer) {
    const interviewerProfile = new InterviewerProfile();
    this.setEmptyProfileProperty(interviewerProfile);

    interviewerProfile.interviewerId = interviewer.id;

    return this.profileRepository.save(interviewerProfile);
  }

  editProfile(createProfileDto: CreateProfileDto, interviewer: Interviewer): Promise<InterviewerProfile> {
    const interviewerProfile = new InterviewerProfile();

    this.delete(interviewer.id);

    this.setProfileProperty(createProfileDto, interviewerProfile);

    interviewerProfile.interviewerId = interviewer.id;

    return this.profileRepository.save(interviewerProfile);
  }

  delete(id: number) {
    this.profileRepository.delete({ interviewerId: id });
  }

  setProfileProperty(createProfileDto: CreateProfileDto, interviewerProfile: InterviewerProfile) {
    interviewerProfile.skype = createProfileDto.skype;
    interviewerProfile.position = createProfileDto.position;
    interviewerProfile.education = createProfileDto.education;
    interviewerProfile.organization = createProfileDto.organization;
  }

  setEmptyProfileProperty(interviewerProfile: InterviewerProfile) {
    interviewerProfile.skype = '';
    interviewerProfile.position = '';
    interviewerProfile.education = '';
    interviewerProfile.organization = '';
  }
}
