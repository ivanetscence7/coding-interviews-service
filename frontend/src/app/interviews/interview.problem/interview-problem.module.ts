import { NgModule } from '@angular/core';
import { InterviewProblemComponent } from './interview-problem.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [MatTreeModule, MatTreeModule, MatIconModule, MatCardModule, CommonModule],
  exports: [InterviewProblemComponent],
  declarations: [InterviewProblemComponent],
  providers: [],
})
export class InterviewProblemModule {}
