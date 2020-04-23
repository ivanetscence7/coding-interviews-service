import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AppHttpResource } from './app-http.resource';
import { Observable } from 'rxjs';
import { SendInviteDto } from '../dto/send-invite.dto';

@Injectable()
export class SessionResource {
  private readonly sessionURL = environment.apiUrl + '/session/';

  constructor(private appHttpResource: AppHttpResource) {}

  public findInterviewProblemByUUID(uuid: string): Observable<SendInviteDto> {
    return this.appHttpResource.get(this.sessionURL + uuid);
  }

  public findSessionByEmail(email: string): Observable<SendInviteDto> {
    return this.appHttpResource.get(this.sessionURL + 'uuid/' + email);
  }
}
