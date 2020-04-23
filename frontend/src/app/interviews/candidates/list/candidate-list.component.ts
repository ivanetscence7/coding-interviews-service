import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CandidateService } from '../../service/candidate.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateCandidateDialogComponent } from '../create.candidate.dialog/create-candidate-dialog.component';
import { CreateCandidateDto } from '../../dto/create-candidate.dto';
import { finalize, take } from 'rxjs/operators';
import { SendInviteDialogComponent } from '../invite.candidate.dialog/send-invite-dialog.component';
import { SocketIoService } from '../../service/socketio.service';
import { v4 as uuid } from 'uuid';
import { SessionService } from '../../service/session.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: 'candidate-list.component.html',
})
export class CandidateListComponent implements OnInit {
  isLoading = false;
  displayedColumns: string[] = ['fullName', 'email', 'desiredPosition', 'age', 'languageSkill', 'action'];

  private candidateListSubject: BehaviorSubject<CreateCandidateDto[]> = new BehaviorSubject(null);

  constructor(
    private candidateService: CandidateService,
    private matDialog: MatDialog,
    private socketService: SocketIoService,
    private sessionService: SessionService,
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.candidateService
      .getAllCandidateItems()
      .pipe(
        take(1),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe(candidate => {
        this.candidateListSubject.next(candidate);
      });
  }

  public getCandidateList(): Observable<CreateCandidateDto[]> {
    return this.candidateListSubject.asObservable();
  }

  public openCreateCandidateDialog() {
    this.matDialog
      .open(CreateCandidateDialogComponent)
      .afterClosed()
      .pipe(take(1))
      .subscribe((newCandidate: CreateCandidateDto) => {
        if (newCandidate) {
          const list = this.candidateListSubject.getValue();
          list.push(newCandidate);
          this.candidateListSubject.next(list.map(candidate => ({ ...candidate })));
        }
      });
  }

  sendInvite(createCandidateDto: CreateCandidateDto) {
    this.matDialog
      .open(SendInviteDialogComponent, {
        data: {
          candidateEmail: createCandidateDto.email,
          hashEmail: uuid(),
        },
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe();
  }

  delete(createCandidateDto: CreateCandidateDto) {
    this.isLoading = true;
    this.candidateService
      .deleteCandidate(createCandidateDto.id)
      .pipe(
        take(1),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe(() => {
        const deleted = this.candidateListSubject
          .getValue()
          .filter(candidate => candidate.id !== createCandidateDto.id);
        this.candidateListSubject.next(deleted);
      });
  }

  joinRoom(createCandidateDto: CreateCandidateDto) {
    this.sessionService.getSessionByCandidateEmail(createCandidateDto.email).subscribe(result => {
      this.socketService.joinRoom(result.sessionUuid);
    });
  }

  leaveRoom(createCandidateDto: CreateCandidateDto) {
    this.sessionService.getSessionByCandidateEmail(createCandidateDto.email).subscribe(result => {
      this.socketService.leaveRoom(result.sessionUuid);
    });
  }
}
