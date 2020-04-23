import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CandidateService } from '../../service/candidate.service';
import { finalize, take } from 'rxjs/operators';
import { SendInviteDto } from '../../dto/send-invite.dto';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProblemDto } from '../../dto/problemModel/problem.dto';
import { ProblemService } from '../../service/problem.service';

@Component({
  selector: 'send-invite-dialog',
  templateUrl: 'send-invite-dialog.component.html',
  styleUrls: ['send-invite-dialog.component.scss'],
})
export class SendInviteDialogComponent implements OnInit {
  inviteByEmail: SendInviteDto = {} as SendInviteDto;
  isLoading = false;
  createInviteForm: FormGroup;
  error: string;
  private problemsSubject: BehaviorSubject<ProblemDto[]> = new BehaviorSubject(null);
  problemTitle: string;

  constructor(
    private dialogRef: MatDialogRef<SendInviteDialogComponent>,
    private candidateService: CandidateService,
    private problemService: ProblemService,
    @Inject(MAT_DIALOG_DATA) public data?: { candidateEmail: string; hashEmail: string },
  ) {
    this.createInviteForm = new FormGroup({
      problem: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  ngOnInit() {
    this.isLoading = true;
    this.problemService
      .getAllProblems()
      .pipe(
        take(1),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe(problems => {
        this.problemsSubject.next(problems);
      });
  }

  public getProblems(): Observable<ProblemDto[]> {
    return this.problemsSubject.asObservable();
  }

  public invite(form: FormGroup) {
    this.setInviteProperties();
    if (form.valid) {
      this.isLoading = true;
      this.candidateService
        .inviteCandidate(this.inviteByEmail)
        .pipe(
          take(1),
          finalize(() => (this.isLoading = false)),
        )
        .subscribe(
          response => {
            this.dialogRef.close(response);
          },
          error => {
            this.error = error;
          },
        );
    }
  }

  setInviteProperties() {
    this.inviteByEmail.sessionUuid = this.data.hashEmail;
    this.inviteByEmail.candidateEmail = this.data.candidateEmail;
    this.inviteByEmail.problemTitle = this.problemTitle;
  }
}
