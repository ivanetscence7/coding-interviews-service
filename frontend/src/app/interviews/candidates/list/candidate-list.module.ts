import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateListComponent } from './candidate-list.component';
import { CommonMaterialModule } from '../../../common/material/common-material.module';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRouting } from '../../../app.routing';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    CommonMaterialModule,
    RouterModule.forRoot(AppRouting, { onSameUrlNavigation: 'reload' }),
    FontAwesomeModule,
    MatTableModule,
    MatTableModule,
    MatSelectModule,
  ],
  exports: [CandidateListComponent],
  declarations: [CandidateListComponent],
  providers: [],
})
export class CandidateListModule {}
