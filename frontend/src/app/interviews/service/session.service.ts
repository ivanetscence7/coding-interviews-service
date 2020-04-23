import { Injectable } from '@angular/core';
import { SessionResource } from '../resource/session.resource';
import { Observable } from 'rxjs';
import { SendInviteDto } from '../dto/send-invite.dto';

@Injectable()
export class SessionService {
  constructor(private sessionResource: SessionResource) {}

  getInterviewProblemByUUID(uuid: string): Observable<SendInviteDto> {
    return this.sessionResource.findInterviewProblemByUUID(uuid);
  }

  getSessionByCandidateEmail(email: string): Observable<SendInviteDto> {
    return this.sessionResource.findSessionByEmail(email);
  }
}
