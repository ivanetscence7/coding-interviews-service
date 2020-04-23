import { Injectable } from '@angular/core';
import { InterviewerResource } from '../resource/interviewer.resource';
import { Observable } from 'rxjs';
import { RegistrationInterviewerDto } from '../dto/registration-interviewer.dto';
import { EditProfileDto } from '../dto/edit-profile.dto';
import { ProfileResource } from '../resource/profile.resource';

@Injectable()
export class ProfileService {
  constructor(private interviewerResource: InterviewerResource, private profileResource: ProfileResource) {}

  getInterviewerInfo(): Observable<RegistrationInterviewerDto> {
    return this.interviewerResource.findOne();
  }

  public editProfile(editProfileDto: EditProfileDto): Observable<EditProfileDto> {
    return this.profileResource.editProfile(editProfileDto);
  }

  getInterviewerProfile(): Observable<EditProfileDto> {
    return this.profileResource.getProfileInfo();
  }
}
