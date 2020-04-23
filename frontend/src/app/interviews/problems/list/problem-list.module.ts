import { NgModule } from '@angular/core';
import { ProblemListComponent } from './problem-list.component';
import { CommonModule } from '@angular/common';
import { CommonMaterialModule } from '../../../common/material/common-material.module';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [CommonModule, CommonMaterialModule, RouterModule, FontAwesomeModule],
  exports: [ProblemListComponent],
  declarations: [ProblemListComponent],
  providers: [],
})
export class ProblemListModule {}
