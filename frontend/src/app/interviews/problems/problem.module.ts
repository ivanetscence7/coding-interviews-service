import { NgModule } from '@angular/core';
import { ProblemService } from '../service/problem.service';
import { ProblemResource } from '../resource/problem.resource';
import { CreateProblemDialogComponent } from './dialog/create-problem-dialog.component';
import { ProblemListModule } from './list/problem-list.module';
import { CommonMaterialModule } from '../../common/material/common-material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ProblemListModule, CommonMaterialModule, MatFormFieldModule, FormsModule, CommonModule],
  exports: [ProblemListModule, CommonMaterialModule],
  declarations: [CreateProblemDialogComponent],
  entryComponents: [CreateProblemDialogComponent],
  providers: [ProblemService, ProblemResource],
})
export class ProblemModule {}
