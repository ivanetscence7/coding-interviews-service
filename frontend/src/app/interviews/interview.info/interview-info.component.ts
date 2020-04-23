import { Component, OnInit } from '@angular/core';
import { InterviewInfoDto } from '../dto/interview.Info.dto';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../service/session.service';
import { finalize, take } from 'rxjs/operators';

@Component({
  selector: 'interview-info',
  templateUrl: 'interview-info.component.html',
})
export class InterviewInfoComponent implements OnInit {
  isLoading = false;
  interviewInfoDto: InterviewInfoDto;

  constructor(private activeRoute: ActivatedRoute, private sessionService: SessionService) {}

  ngOnInit() {
    this.isLoading = true;
    if (this.activeRoute.snapshot.paramMap.get('candidate') !== null) {
    }
  }

  isInterview() {}
}
