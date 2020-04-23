import { Injectable } from '@angular/core';
import { CandidateResource } from '../resource/candidate.resource';
import { Observable } from 'rxjs';
import { CandidateListItemDto } from '../dto/candidate-list-Item.dto';
import { CreateCandidateDto } from '../dto/create-candidate.dto';
import { SendInviteDto } from '../dto/send-invite.dto';

@Injectable()
export class CandidateService {
  constructor(private candidateResource: CandidateResource) {}

  public getAllCandidateItems(): Observable<CandidateListItemDto[]> {
    return this.candidateResource.findAll();
  }

  public createCandidate(createPostDto: CreateCandidateDto): Observable<CreateCandidateDto> {
    return this.candidateResource.create(createPostDto);
  }

  public deleteCandidate(candidateId: number): Observable<void> {
    return this.candidateResource.delete(candidateId);
  }

  public inviteCandidate(invite: SendInviteDto): Observable<void> {
    return this.candidateResource.invite(invite);
  }
}
