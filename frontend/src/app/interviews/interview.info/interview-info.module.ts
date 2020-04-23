import { NgModule } from '@angular/core';
import { InterviewInfoComponent } from './interview-info.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [MatTreeModule, MatTreeModule, MatIconModule, MatCardModule, CommonModule],
  exports: [InterviewInfoComponent],
  declarations: [InterviewInfoComponent],
  providers: [],
})
export class InterviewInfoModule {}
