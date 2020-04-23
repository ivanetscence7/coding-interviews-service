import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CandidatesModule } from './candidates/candidates.module';
import { AuthGuard } from './guards/auth.guard';
import { SessionResource } from './resource/session.resource';
import { SessionService } from './service/session.service';

@NgModule({
  imports: [CandidatesModule, HttpClientModule],
  providers: [AuthGuard, SessionService, SessionResource],
  exports: [CandidatesModule],
  declarations: [],
})
export class InterviewModule {}
