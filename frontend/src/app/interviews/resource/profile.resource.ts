import { Injectable } from '@angular/core';
import { EditProfileDto } from '../dto/edit-profile.dto';
import { AppHttpResource } from './app-http.resource';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ProfileResource {
  private readonly profileURL = environment.apiUrl + '/profile';

  constructor(private appHttpResource: AppHttpResource) {}

  editProfile(editProfileDto: EditProfileDto): Observable<EditProfileDto> {
    return this.appHttpResource.put(this.profileURL, editProfileDto);
  }

  getProfileInfo(): Observable<EditProfileDto> {
    return this.appHttpResource.get(this.profileURL);
  }
}
