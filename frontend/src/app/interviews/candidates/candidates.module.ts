import { NgModule } from '@angular/core';
import { CandidateListModule } from './list/candidate-list.module';
import { CandidateService } from '../service/candidate.service';
import { CandidateResource } from '../resource/candidate.resource';
import { CommonMaterialModule } from '../../common/material/common-material.module';
import { CreateCandidateDialogComponent } from './create.candidate.dialog/create-candidate-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SendInviteDialogComponent } from './invite.candidate.dialog/send-invite-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { ProblemService } from '../service/problem.service';
import { RouterModule } from '@angular/router';
import { AppRouting } from '../../app.routing';

@NgModule({
  imports: [
    CandidateListModule,
    CommonMaterialModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    RouterModule.forChild(AppRouting),
  ],
  exports: [CandidateListModule, CommonMaterialModule],
  declarations: [CreateCandidateDialogComponent, SendInviteDialogComponent],
  entryComponents: [CreateCandidateDialogComponent, SendInviteDialogComponent],
  providers: [CandidateService, ProblemService, CandidateResource],
})
export class CandidatesModule {}
