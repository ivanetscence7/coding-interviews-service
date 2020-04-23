import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../service/session.service';
import { finalize, take } from 'rxjs/operators';
import { SendInviteDto } from '../dto/send-invite.dto';

@Component({
  selector: 'app-interview-problem',
  templateUrl: 'interview-problem.component.html',
  styleUrls: ['./interview-problem.component.scss'],
})
export class InterviewProblemComponent implements OnInit {
  isLoading = false;
  inviteDto: SendInviteDto = {} as SendInviteDto;

  constructor(private activeRoute: ActivatedRoute, private sessionService: SessionService) {}

  ngOnInit() {
    this.isLoading = true;
    if (this.activeRoute.snapshot.paramMap.get('candidate') !== null) {
      this.sessionService
        .getInterviewProblemByUUID(this.activeRoute.snapshot.paramMap.get('candidate'))
        .pipe(
          take(1),
          finalize(() => (this.isLoading = false)),
        )
        .subscribe(interviewProblem => {
          if (interviewProblem) {
            this.inviteDto = interviewProblem;
          }
        });
    }
  }

  checkRoute() {
    return this.activeRoute.snapshot.paramMap.get('candidate') !== null;
  }
}
