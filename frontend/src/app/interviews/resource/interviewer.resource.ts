import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrationInterviewerDto } from '../dto/registration-interviewer.dto';
import { AppHttpResource } from './app-http.resource';
import { environment } from '../../../environments/environment';

@Injectable()
export class InterviewerResource {
  private readonly interviewerURL = environment.apiUrl + '/interviewer';

  constructor(private appHttpResource: AppHttpResource) {}

  findOne(): Observable<RegistrationInterviewerDto> {
    return this.appHttpResource.get(this.interviewerURL);
  }
}
