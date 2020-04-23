import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidateListItemDto } from '../dto/candidate-list-Item.dto';
import { CreateCandidateDto } from '../dto/create-candidate.dto';
import { environment } from '../../../environments/environment';
import { AppHttpResource } from './app-http.resource';
import { SendInviteDto } from '../dto/send-invite.dto';

@Injectable()
export class CandidateResource {
  private readonly candidatesURL = environment.apiUrl + '/candidates';

  constructor(private appHttpResource: AppHttpResource) {}

  public findAll(): Observable<CandidateListItemDto[]> {
    return this.appHttpResource.get(this.candidatesURL);
  }

  public create(createPostDto: CreateCandidateDto): Observable<CreateCandidateDto> {
    return this.appHttpResource.post(this.candidatesURL, createPostDto);
  }

  public delete(id: number): Observable<void> {
    return this.appHttpResource.delete(this.candidatesURL + '/' + id);
  }

  public invite(invite: SendInviteDto): Observable<void> {
    return this.appHttpResource.post(this.candidatesURL + '/invite', invite);
  }
}
