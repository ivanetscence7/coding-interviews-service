import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatIconModule,
    MatDialogModule,
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatIconModule,
    MatDialogModule,
  ],
  declarations: [],
  providers: [],
})
export class CommonMaterialModule {}
