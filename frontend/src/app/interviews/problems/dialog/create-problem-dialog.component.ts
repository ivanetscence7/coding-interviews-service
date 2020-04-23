import { Component, Inject, OnInit } from '@angular/core';
import { ProblemDto } from '../../dto/problemModel/problem.dto';
import { NgForm } from '@angular/forms';
import { finalize, take } from 'rxjs/operators';
import { ProblemService } from '../../service/problem.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditProblemDto } from '../../dto/problemModel/edit-problem.dto';
import { Observable } from 'rxjs';
import { CreateProblemDto } from '../../dto/problemModel/create-problem.dto';

@Component({
  selector: 'app-create-problem-dialog',
  templateUrl: 'create-problem-dialog.component.html',
})
export class CreateProblemDialogComponent implements OnInit {
  problemModel: CreateProblemDto | EditProblemDto = {} as CreateProblemDto;
  isLoading = false;
  isEditing = false;

  constructor(
    private dialogRef: MatDialogRef<CreateProblemDialogComponent>,
    private problemService: ProblemService,
    @Inject(MAT_DIALOG_DATA) public data?: { editProblemDto: EditProblemDto },
  ) {}

  ngOnInit(): void {
    this.isEditing = this.data?.editProblemDto !== undefined;

    if (this.isEditing) {
      this.problemModel = { ...this.data.editProblemDto };
    }
  }

  public submit(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      this.handleAfterSubmit(
        this.isEditing
          ? this.problemService.editProblem(this.problemModel as EditProblemDto)
          : this.problemService.createProblem(this.problemModel),
      );
    }
  }

  private handleAfterSubmit(observable: Observable<ProblemDto>) {
    return observable
      .pipe(
        take(1),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe(response => {
        this.dialogRef.close(response);
      });
  }
}
