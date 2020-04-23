import { NgModule } from '@angular/core';
import { EditorComponent } from './editor.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { MatButtonModule } from '@angular/material/button';
import { InterviewProblemModule } from '../interview.problem/interview-problem.module';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CodemirrorModule,
    MatButtonModule,
    InterviewProblemModule,
    TextFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  exports: [],
  declarations: [EditorComponent],
  providers: [],
})
export class EditorModule {}
